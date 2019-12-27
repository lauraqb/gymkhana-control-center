import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import NuevaPartidaModal from './NuevaPartidaModal'
import PartidaCard from './PartidaCard'

import '../styles/Partidas.css'

export class PartidasContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            partidas: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.getPartidas()
    }
    handleClick = () => {
        if (this.props.socket.connected)
            this.setState({ modal: true});
        else 
            alert("socket disconnected")
        
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
        return <div>
            <center>Selecciona una partida</center>
            <Row>
                <Col><Button onClick={this.handleClick}>Crear una partida</Button></Col>
            </Row>
            <NuevaPartidaModal modal={this.state.modal} socket={this.props.socket}></NuevaPartidaModal>
            {this.displayPartidaCards()} 
        </div>
    }
}

export default PartidasContainer
