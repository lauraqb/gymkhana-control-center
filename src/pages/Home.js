import React from 'react';
import PartidasContainer from '../components/Partidas'
import socketIOClient from "socket.io-client";

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT
const socket = socketIOClient(endpoint);

class Home extends React.Component {
    // constructor(props) {
    // }
    render() {
        return <PartidasContainer socket={socket}/>
    }
}

export default Home