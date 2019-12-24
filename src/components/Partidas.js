import React from 'react';
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PartidaCard from './PartidaCard'
import '../styles/Partidas.css';

export class PartidasContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            partidas: null
        };

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPartidas()
    }
    handleClick = () => {
        this.setState({ modal: true});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            nombrePartida: document.getElementById("nombrePartida").value,
            clave: document.getElementById("clavePartida").value
        }
        if(data.nombrePartida && data.clave) {
            this.props.socket.emit("addNuevaPartida", data, (data)=> {
                if(data) this.setState({ modal: false})
            })
        }
        else {
            console.log("faltan datos")
        }
        
    }

    getPartidas = () => {
        var This = this
        this.props.socket.emit("requestPartidasFromCC", (data) => {
            This.setState({
                partidas: data
            })
        })
    }

    displayPartidaCards = () => {
        if(this.state.partidas) {
            return this.state.partidas.map((partida, index) => {
                return <PartidaCard nombre={partida.nombre_partida}></PartidaCard>
            })
        }
    }

    render() {
        return <Container>
            <Button onClick={this.handleClick}>CREAR PARTIDA</Button>
            <Modal show={this.state.modal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Crear nueva partida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="nueva-partida-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="nombrePartida">
                            <Form.Label>Nombre de la partida</Form.Label>
                            <Form.Control placeholder="Introduce el nombre" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="clavePartida">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control placeholder="Introduce la clave" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Equipos</Form.Label>
                        <Form.Row className="form-equipo">
                            <Col>
                            <Form.Control placeholder="Nombre equipo" />
                            </Col>
                            <Col>
                            <Form.Control placeholder="Clave" />
                            </Col>
                        </Form.Row>
                        + Añadir nuevo equipo
                        </Form.Row>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
            

            {this.displayPartidaCards()} 
        </Container>
    }
}

export default PartidasContainer
