import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '90%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [
        {latitude: 41.3846877, longitude: 2.1800151999999997},
        {latitude: 41.3846877, longitude: 2.1810151999999997},
      ]
    }
  }

  displayMarkers = () => {
    return this.state.teams.map((team, index) => {
      return <Marker key={index} id={index} position={
        {
          lat: team.latitude,
          lng: team.longitude
        }
      }/>
    })
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{
         lat: 41.386471,
         lng: 2.186688
        }}
        >
          {this.displayMarkers()}
        </Map>
  
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(MapContainer);
   


