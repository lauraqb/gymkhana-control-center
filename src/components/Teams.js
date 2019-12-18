import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import IosTrash from 'react-ionicons/lib/MdTrash'
import '../styles/teams.css';


export class TeamsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.eliminarJugador = this.eliminarJugador.bind(this)
        this.state = {
            jugadores: null,
        }
        const This = this
        let socket = this.props.socket
        socket.emit("requestUserListFromCC")
        socket.on("usersList", function(data) {
            This.setState({
                jugadores: data
            })
        })
    }

    eliminarJugador = (nombreJugador) => {
        this.props.socket.emit("eliminarJugadorFromCC", nombreJugador, (data) => {
            if (data) this.props.socket.emit("requestUserListFromCC")
            else console.log("Error: jugador no eliminado")
        })
    }

    displayTeamList = (nombreEquipo) => {
        if(this.state.jugadores) {
            return this.state.jugadores.map((jugador, index) => {
                if (jugador.equipo === nombreEquipo)
                    return <ListGroup.Item>{jugador.nombre}<IosTrash fontSize="20px" color="grey" onClick={() => this.eliminarJugador(jugador.nombre)}  className="trash-icon"/></ListGroup.Item>
            })
        }
        
    }
    render() {
        return <div>
            <Container>
                <Row>
                    <Col>
                        <ListGroup> 
                            <ListGroup.Item variant="danger">Equipo Rojo</ListGroup.Item>
                            {this.displayTeamList("rojo")} 
                        </ListGroup>
                    </Col>
                    <Col><ListGroup> 
                        <ListGroup.Item variant="primary">Equipo Azul</ListGroup.Item>
                        {this.displayTeamList("azul")} 
                    </ListGroup></Col>
                </Row>
            </Container>
            
        </div>
    }
}

export default TeamsContainer