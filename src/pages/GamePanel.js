import React from 'react';
import MapContainer from '../components/Map'
import Teams from '../components/Teams'
import socketIOClient from "socket.io-client";

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
const socket = socketIOClient(endpoint);

class GamePanel extends React.Component {
    constructor(props) {
        debugger
        super(props)
        this.id = this.props.match.params.id
    }
    render() {
        return <div className="App">
            <Teams socket={socket} gameId={this.id}/>
            <MapContainer socket={socket}/>
        </div>
    }
}

export default GamePanel