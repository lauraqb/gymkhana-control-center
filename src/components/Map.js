import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import socketIOClient from "socket.io-client";

const endpoint = 'http://localhost:8000' 
const socket = socketIOClient(endpoint);

const mapStyles = {
  width: '90%',
  height: '90%'
};

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      teams: [
        {team: "rojo", latitude: 41.3846877, longitude: 2.1800151999999997},
        //{latitude: 41.3846877, longitude: 2.1810151999999997},
      ]
    }

    /*requestFromControlCenter: Al cargar la página, le pedimos al servidor que nos mande las coordenadas*/
    socket.emit("requestFromControlCenter")
    
    socket.on("coordenadasFromServer", data => {
        let noEncontrado = true
        let equipos = this.state.teams
        equipos.map((item, key)=>{
          if(item.team == data.team) {
            equipos[key].latitude = data.latitude
            equipos[key].longitude = data.longitude
            noEncontrado = false
            console.log('El equipo '+data.team+' se está moviendo')
            console.log(data)
          }
        })
        if (noEncontrado) {
          console.log('El equipo '+data.team+' ha sido añadido al mapa')
          equipos.push(data)
        }
        this.setState({
          teams: equipos
        })
      }
    )
  }


  displayMarkers = () => {
    return this.state.teams.map((team, index) => {
      return <Marker key={index} id={index} position={
        {
          lat: team.latitude,
          lng: team.longitude
        }
      }
      icon={
        {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
      }
      />
    })
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 41.386471, lng: 2.186688 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}
//process.env.GOOGLE_MAPS_API_KEY
export default GoogleApiWrapper({
  apiKey:  ""
})(MapContainer);
   


