import React from 'react';
import PartidasContainer from '../components/Partidas'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Home.css'
import socketIOClient from "socket.io-client"
const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT //añadir la url del servidor
const socket = socketIOClient(serverEndpoint);

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            envMissing: false
          };
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        if (!serverEndpoint) {
            this.setState({ envMissing: true })
        }
    }
    
    render() {
        const { envMissing, error } = this.state;
        if (envMissing) {
            return <p>Falta el fichero .env</p>;
        }
        return <Container className="container-home">
            <Row>
                <Col><h3><center>Centro de Control</center></h3></Col>
            </Row>
            <PartidasContainer socket={socket}/>
        </Container>
        
    }
}

export default Home