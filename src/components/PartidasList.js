import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import NuevaPartidaModal from './NuevaPartidaModal'
import PartidaCard from './PartidaCard'
import Card from 'react-bootstrap/Card'

export class PartidasListContainer extends React.Component {
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
            {this.displayPartidaCards()} 
            <Card className="g-card" onClick={this.handleClick}><Card.Body><h5>+ Crear una partida</h5></Card.Body></Card>
            <NuevaPartidaModal modal={this.state.modal} socket={this.props.socket}></NuevaPartidaModal>
        </div>
    }
}

export default PartidasListContainer
