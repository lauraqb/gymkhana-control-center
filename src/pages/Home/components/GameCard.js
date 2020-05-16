import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import Accordion from 'react-bootstrap/Accordion'
import { IconContext } from "react-icons"
import { GiAbstract118 } from "react-icons/gi"
import './GameCard.css'

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

export class GameCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        teams: null,
        teamName: "",
        teamKey: ""
      }
      
      this.id = this.props.id
      this.nombrePartida = this.props.nombre
      this.pin = this.props.pin
      this.link = "./game/"+this.props.id+"?clave="+this.pin
      this.linkChallenges = "./game/"+this.props.id+"/challenges"
      this.handleChange = this.handleChange.bind(this)
      this.getTeams()
      this.addNewTeam = this.addNewTeam.bind(this)
    }

    
    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
        })
    }

    getTeams = () => {
      axios.get(endpoint+"/cc/games/"+this.props.id+"/teams")
      .then(res => {
          this.setState({
              teams: res.data
          })
      })
      .catch(error => this.setState({ error: error.message }))
    }

    addNewTeam = (e) => {
      e.preventDefault()
      axios.put(endpoint+"/cc/games/"+this.props.id+"/teams", {teamName: this.state.teamName, teamKey: this.state.teamKey})
      .then(res => {
        this.getTeams()
      })
      .catch(error => console.error(error.message))
    }

    render() {
      if(this.state.error) {
        return <div>{this.state.error}</div>
      }
      return (
          <Card className="g-card" >
            <Card.Body>
              <Link to={this.link} className="g-link">
                <div className="icono">
                  <IconContext.Provider value={{ color: "#5a80a9", size:	"2.50em" }}> <GiAbstract118 /> </IconContext.Provider>
                </div>
              </Link>
              <div>
                  <Link to={this.link} className="g-link">
                    <Card.Text className="g-card-title">{this.nombrePartida}</Card.Text>
                  </Link>
                  <Card.Text>PIN: {this.pin}</Card.Text>
                  <Link to={this.linkChallenges} className="g-link">
                    <Button variant="link">Pruebas JSON</Button>
                  </Link>
                  <Accordion defaultActiveKey="0">
                      <Accordion.Toggle as={Button} variant="link" eventKey="1" data-test="g-expand-teams-btn">
                          Equipos >
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                          <div className="g-teams-container">
                            {this.state.teams && this.state.teams.length === 0 && <span> No hay ningún equipo creado</span>}
                            {this.state.teams && this.state.teams.length > 0 && <
                              div className="g-teamslist" data-test="teamslist">{this.state.teams.map((team, index) => <div key={index}>- {team.name}, <span>{team.key}</span> </div>)}</div>
                              }

                            <Form onSubmit={this.addNewTeam}>
                              <Form.Row>
                                  <Col><Form.Control placeholder="Nombre equipo" name="teamName" value={this.state.teamName} onChange={this.handleChange}/></Col>
                                  <Col><Form.Control placeholder="Clave" name="teamKey" value={this.state.teamKey} onChange={this.handleChange}/></Col>
                                  <Button variant="primary" type="submit">Añadir nuevo equipo</Button>
                              </Form.Row>
                            </Form>
                          </div>
                      </Accordion.Collapse>
                  </Accordion>


                
              
              </div>
            </Card.Body>
          </Card>
      
      )
    }
}

export default GameCard