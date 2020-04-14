import React from 'react'
import axios from 'axios'
import MapContainer from '../components/Map'
import Teams from '../components/Teams'
import socketIOClient from "socket.io-client";

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
const socket = socketIOClient(endpoint);

class GamePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameName: null,
            pin: null,
            error: null
        }
        this.id = this.props.match.params.id
        this.getGameData()
    }
    getGameData = () => {
        axios.get(endpoint+"/games/"+this.id)
        .then(res => {
            this.setState({
                error: null,
                gameName: res.data.name,
                pin: res.data.pin
            })
        })
        .catch(error => this.setState({ error: error.message }));
    }
    render() {
        return <div className="App">
            <h3>{this.state.gameName}</h3>
            <Teams socket={socket} gameId={this.id}/>
            <MapContainer socket={socket}/>
        </div>
    }
}

export default GamePanel