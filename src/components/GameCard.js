import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { IconContext } from "react-icons";
import { GiAbstract118 } from "react-icons/gi";

export class GameCard extends React.Component {
    constructor(props) {
      super(props)
      this.nombrePartida = this.props.nombre
      this.clave = this.props.clave
      this.link = "./game/"+this.props.id+"?clave="+this.props.pin
    }

    render() {
        return  <Link to={this.link} className="g-link">
        <Card className="g-card">
          <Card.Body>
            <IconContext.Provider value={{ color: "#5a80a9", size:	"2.50em" }}>
                <div className="icono"><GiAbstract118 /></div>
            </IconContext.Provider>
            <div>
              <Card.Text className="g-card-title">{this.nombrePartida}</Card.Text>
              <Card.Text>Clave: {this.clave}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>
    }
}

export default GameCard