import React from 'react';
import NewGameModal from './NewGameModal'
import GameCard from './GameCard'
import Card from 'react-bootstrap/Card'

export class GamesListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            games: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.getGames()
    }
    handleClick = () => {
        if (this.props.socket.connected)
            this.setState({ modal: true});
        else 
            alert("socket disconnected")
    }

    getGames = () => {
        var This = this
        this.props.socket.emit("requestPartidasFromCC", (data) => {
            This.setState({
                games: data
            })
        })
    }

    displayPartidaCards = () => {
        if(this.state.games) {
            return this.state.games.map((game, index) => {
                return <GameCard nombre={game.nombre_partida} id={game.id} clave={game.clave}></GameCard>
            })
        }
    }

    render() {
        return <div>
            <center>Selecciona una partida</center>
            {this.displayPartidaCards()} 
            <Card className="g-card" onClick={this.handleClick}><Card.Body><h5>+ Crear una partida</h5></Card.Body></Card>
            <NewGameModal modal={this.state.modal} socket={this.props.socket}></NewGameModal>
        </div>
    }
}

export default GamesListContainer
