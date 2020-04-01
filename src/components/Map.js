import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const colores = {
  verde: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  rojo: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  azul: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
}

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
    const socket = this.props.socket
    /*requestFromControlCenter: Al cargar la página, le pedimos al servidor que nos mande las coordenadas*/
    socket.emit("requestCoordenadasFromCC", (data) => {
      const parseData = JSON.parse(data)
      this.setState({
        players: parseData
      })
    })
    
    socket.on("coordenadasFromServer", data => {
      this.updateCoordinatesState(data)
    })
  }

  updateCoordinatesState = (data) => {
    let noEncontrado = true
    let equipos = this.state.players
    equipos.map((item, key)=>{
      if(item.playerId === data.playerId) {
        equipos[key].latitude = data.latitude
        equipos[key].longitude = data.longitude
        noEncontrado = false
        console.log('El equipo '+data.playerId+' se está moviendo')
        console.log(data)
      }
    })
    if (noEncontrado) { //TODO ??
      console.log('El equipo '+data.equipo+' ha sido añadido al mapa')
      equipos.push(data)
    }
    this.setState({
      players: equipos
    })
  }


  displayMarkers = () => {
    return this.state.players.map((jugador, index) => {
      let iconUrl = colores[jugador.equipo] ? colores[jugador.equipo] : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
      return <Marker key={index} id={index} position={
        {
          lat: jugador.latitude,
          lng: jugador.longitude
        }
      }
      title={jugador.jugador}
      //name={'nombre'}
      icon={
        {url: iconUrl}
      }
      />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        className={'map'}
        initialCenter={{ lat: 41.386471, lng: 2.186688 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}
//

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
   


