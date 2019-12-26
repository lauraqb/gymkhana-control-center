import React from 'react';
import PartidasContainer from '../components/Partidas'
import socketIOClient from "socket.io-client";

const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT
const socket = socketIOClient(serverEndpoint);

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            envMissing: false
          };
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        if (serverEndpoint) fetch(serverEndpoint).catch(error => {debugger});
        else this.setState({ envMissing: true });
      }
    
    render() {
        const { envMissing, error } = this.state;
        if (envMissing) {
            return <p>Falta el fichero .env</p>;
        }
        else if (error) {
            return <p>Error del servidor: {error.message}</p>;
        }
        return <PartidasContainer socket={socket}/>
    }
}

export default Home