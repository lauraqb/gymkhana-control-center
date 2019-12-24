import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export class PartidaCard extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Nombre Partida</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Link to="./partida" className="App-link">
              <Button type="submit">Abrir Partida</Button>
          </Link>

        </Card.Body>
      </Card>
    }
}

export default PartidaCard