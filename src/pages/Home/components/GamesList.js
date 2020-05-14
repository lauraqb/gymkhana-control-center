import React from 'react'
import axios from 'axios'
import NewGameModal from './NewGameModal'
import GameCard from './GameCard'

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

export class GamesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            games: null,
            error: null
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
        axios.get(endpoint+"/cc/games")
        .then(res => {
            console.log(res.data);
            this.setState({
                games: res.data
            })
        })
        .catch(error => this.setState({ error: error.message }));
    }


    render() {
        if (this.state.error) {
            return <div><center>{this.state.error}</center></div>
        }
        else if (!this.state.games) {
            return <div><center>Loading...</center></div>
        }
        return <div>
            <center>Selecciona una partida</center>
            {this.state.games.map((game, index) => {
                return <GameCard nombre={game.name} id={game.id} pin={game.pin}></GameCard>
            })}
            {/* TODO: donde poner el crear partida? */}
            {/* <Card className="g-card" onClick={this.handleClick}><Card.Body><h5>+ Crear una partida</h5></Card.Body></Card> */}
            <NewGameModal modal={this.state.modal} socket={this.props.socket}></NewGameModal>
        </div>
    }
}

export default GamesList
