import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export class PartidaCard extends React.Component {
    constructor(props) {
      super(props)
      this.nombrePartida = this.props.nombre
    }

    render() {
        return <Card>
        <Card.Body>
          <Card.Title>{this.nombrePartida}</Card.Title>
          <Card.Text>
            Texto, clave, equipos
          </Card.Text>
          <Link to="./partida" className="App-link">
              <Button type="submit">Abrir Partida</Button>
          </Link>

        </Card.Body>
      </Card>
    }
}

export default PartidaCard