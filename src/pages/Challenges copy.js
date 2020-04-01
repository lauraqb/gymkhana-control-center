import React from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

class GamePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            challenges: null,
        }
        debugger
        this.id = this.props.match.params.id
        this.getChallengesJson()
    }

    getChallengesJson = () => {
        axios.get(endpoint+"/games/"+this.id+"/challenges")
        .then(res => {
            console.log(res.data.info);
            this.setState({
                challenges: res.data.info
            })
        })
        .catch(error => this.setState({ error: error.message }));
    }

    render() {
        if(!this.state.challenges) return <div>No challenges</div>
        else {
            return ( 
                <div>
                    <Form>
                        <Form.Control as="textarea" value={JSON.stringify(this.state.challenges, null, 2) }></Form.Control>
                    </Form>
                    <Container fluid="true" className="teams-container">
                        <Row>
                        <Col>
                        <div><pre>{JSON.stringify(this.state.challenges, null, 2) }</pre></div>
                        </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

export default GamePanel