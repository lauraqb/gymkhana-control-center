import React from 'react';
import MapContainer from '../components/Map'
import TeamsContainer from '../components/Teams'
import socketIOClient from "socket.io-client";

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
const socket = socketIOClient(endpoint);

class Partida extends React.Component {
    // constructor(props) {

    // }
    render() {
        return <div className="App">
            <TeamsContainer socket={socket}/>
            <MapContainer socket={socket}/>
        </div>
    }
}

export default Partida