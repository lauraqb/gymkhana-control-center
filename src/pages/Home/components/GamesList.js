import React from 'react'
import axios from 'axios'
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
        this.getGames()
    }


    getGames = () => {
        axios.get(endpoint+"/cc/games")
        .then(res => {
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
                return <GameCard key={index} nombre={game.name} id={game.id} pin={game.pin}></GameCard>
            })}
            {/* TODO: donde poner el crear partida? */}
            {/* <Card className="g-card" onClick={this.handleClick}><Card.Body><h5>+ Crear una partida</h5></Card.Body></Card> */}
        </div>
    }
}

export default GamesList
