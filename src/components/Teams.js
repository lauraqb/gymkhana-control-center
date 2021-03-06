import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import IosTrash from 'react-ionicons/lib/MdTrash'
import './styles/Teams.css';

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

export class Teams extends React.Component {
    constructor(props) {
        super(props)
        this.deletePlayer = this.deletePlayer.bind(this)
        this.state = {
            players: null,
            error: null
        }
        this.gameId = this.props.gameId
        this.getTeamsList()
        this.getPlayersList()
    }

    getTeamsList = () => {
        axios.get(endpoint+"/games/"+this.gameId+"/teams")
        .then( res => this.setState({ teams: res.data }) )
        .catch( error => this.setState({ error: error.message }) )
    }

    getPlayersList = () => {
        axios.get(endpoint+"/games/"+this.gameId+"/players")
        .then( res => this.setState({ players: res.data }) )
        .catch( error => this.setState({ error: error.message }) )
    }

    deletePlayer = (playerId) => {
        var r = window.confirm("¿Confirmas que deseas eliminar a este jugador?")
        if (!r) return
        axios.get(endpoint+"/deletePlayer/"+playerId)
        .then(res => {
            this.getPlayersList()
        })
        .catch(error => this.setState({ error: error.message }))
    }

    displayTeamList = (teamId) => {
        if(!this.state.players) return <div>No players</div>
        return this.state.players.map((player) => {
            if (player.team_id === teamId)
                return <ListGroup.Item key={player.name}>{player.name}<IosTrash fontSize="20px" color="grey" onClick={() => this.deletePlayer(player.id)}  className="trash-icon"/></ListGroup.Item>
            else return null
        })
    }
    displayTeamsData = () => {
        if(!this.state.teams) return <div>No teams</div>
        return this.state.teams.map((team) => {
            return <Col>
                    <ListGroup> 
                        <ListGroup.Item variant="primary">Equipo {team.name}</ListGroup.Item>
                        {this.displayTeamList(team.id)} 
                    </ListGroup>
                </Col>
        })
    }
    render() {
        return (
            <Container fluid="true" className="teams-container">
                {this.state.error && <div>Error: {this.state.error}</div>}
                <Row>
                    {this.displayTeamsData()}
                    <Col>
                        <ListGroup> 
                            <ListGroup.Item variant="secondary">Sin equipo</ListGroup.Item>
                            {this.displayTeamList(null)} 
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Teams