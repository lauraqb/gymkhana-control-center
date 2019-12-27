import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export class NuevaPartidaModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    render() {
        return <Modal show={this.props.modal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title><h5>Crear nueva partida</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="nueva-partida-form" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="nombrePartida">
                            {/* <Form.Label>Nombre de la partida</Form.Label> */}
                            <Form.Control placeholder="Nombre de la partida" />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="clavePartida">
                            {/* <Form.Label>Clave</Form.Label> */}
                            <Form.Control placeholder="Clave de la partida"/>
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
                        Enviar
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
    }
}

export default NuevaPartidaModal