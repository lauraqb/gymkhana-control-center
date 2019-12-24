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
        
    }
    handleClick = () => {
        this.setState({ modal: true});
    }

    handleSubmit = (e) => {
        debugger
        const data = {
            nombrePartida: e.nombre, 
            clave: e.clave

        }
        this.props.socket.emit("addNuevaPartida", {nombre: e.nombre, clave: e.clave}, (data)=> {
            if(data) this.setState({ modal: false})
        })
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
                return <PartidaCard key={partida.nombre}>{partida.nombre}></PartidaCard>
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
                <Form className="nueva-partida-form">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nombre de la partida</Form.Label>
                        <Form.Control placeholder="Introduce el nombre" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
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
                
                <Button variant="primary" type="submit" onSubmit={this.handleSubmit}>
                    Submit
                </Button>
                </Form>
                </Modal.Body>
            </Modal>
            

            {this.displayPartidaCards()} 
            <PartidaCard/>
        </Container>
    }
}

export default PartidasContainer
