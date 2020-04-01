import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { IconContext } from "react-icons"
import { GiAbstract118 } from "react-icons/gi"
import './styles/GameCard.css'

export class GameCard extends React.Component {
    constructor(props) {
      super(props)
      this.nombrePartida = this.props.nombre
      this.pin = this.props.pin
      this.link = "./game/"+this.props.id+"?clave="+this.pin
      this.linkChallenges = "./game/"+this.props.id+"/challenges"
    }

    render() {
        return  <Link to={this.link} className="g-link">
        <Card className="g-card">
          <Card.Body>
          <div className="icono">
              <IconContext.Provider value={{ color: "#5a80a9", size:	"2.50em" }}>
                  <GiAbstract118 />
              </IconContext.Provider>
            </div>
            <div>
              <Card.Text className="g-card-title">{this.nombrePartida}</Card.Text>
              <Card.Text>PIN: {this.pin}</Card.Text>
              <Link to={this.linkChallenges} className="g-link">
              <Card.Link href="#">Pruebas JSON</Card.Link>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Link>
    }
}

export default GameCard