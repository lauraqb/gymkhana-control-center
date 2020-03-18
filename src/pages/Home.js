import React from 'react';
import GamesList from '../components/GamesList'
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
        return <div className="App-content">
                <Container>
                <Row>
                    <Col><div className="g-title"><h3>Centro de Control</h3></div></Col>
                </Row>
                <GamesList socket={socket}/>
            </Container>
        </div>
        
    }
}

export default Home