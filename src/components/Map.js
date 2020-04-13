import React, { Component } from 'react'
import axios from 'axios'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

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
      coordinates: []
    }
    const socket = this.props.socket
    socket.on("coordenadasFromServer", data => {
      this.updateCoordinates(data)
    })
  }

  /*Al cargar la página, le pedimos al servidor que nos mande las coordenadas*/
  componentDidMount() {
    this.getCoordinates()
  }

  getCoordinates = () => {
    axios.get(endpoint+"/coordinates/")
    .then(res => {
        console.log(res.data)
        if(res.data) {
          this.setState({ coordinates: res.data})
        } 
    })
    .catch(error => this.setState({ error: error.message }));
}

  updateCoordinates = (data) => {
    console.log("updateCoordinates")
    let noEncontrado = true
    let newCoordinates = this.state.coordinates
    for (let i; i<newCoordinates.length; i++) {
      if(newCoordinates[i].userid === data.userid) {
        newCoordinates[i].username = data.username
        newCoordinates[i].latitude = data.latitude
        newCoordinates[i].longitude = data.longitude
        noEncontrado = false
        console.log('El equipo '+data.playerId+' se está moviendo')
        console.log(data)
      }
    }

    if (noEncontrado) { //TODO ??
      console.log('El equipo '+data.equipo+' ha sido añadido al mapa')
      newCoordinates.push(data)
    }
    this.setState({
      coordinates: newCoordinates
    })
  }


  displayMarkers = () => {
    debugger
    return this.state.coordinates.map((player, index) => {
        const username = player.username ? player.username.toString() : "sin nombre"
        let iconUrl = colores[player.equipo] ? colores[player.equipo] : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
        return <Marker key={index} 
          id={index} 
          position={ {lat: player.latitude, lng: player.longitude } }
          title={username}
          name={'SOMA'}//{player.username}
          icon={ {url: iconUrl} }
        />
    })
  }

  render() {
    return (
      <Map google={this.props.google} zoom={16}
        style={mapStyles}
        className={'map'}
        initialCenter={{ lat: 41.386471, lng: 2.186688 }}
      >
        {this.displayMarkers()}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
   


