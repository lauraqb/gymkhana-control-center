import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { IconContext } from "react-icons";
import { GiAbstract118 } from "react-icons/gi";

export class PartidaCard extends React.Component {
    constructor(props) {
      super(props)
      this.nombrePartida = this.props.nombre
    }

    render() {
        return  <Link to="./partida" className="Card-link">
        <Card>
          <Card.Body>
          <IconContext.Provider value={{ color: "red", size:	"2em" }}>
              <div className="icono"><GiAbstract118 /></div>
            </IconContext.Provider>
            <Card.Text>
              <h5>{this.nombrePartida}</h5>
              Texto, clave, equipos
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    }
}

export default PartidaCard