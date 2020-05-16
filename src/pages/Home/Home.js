import React from 'react';
import GamesList from './components/GamesList'
import Container from 'react-bootstrap/Container'
import './Home.css'
const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            envMissing: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        if (!serverEndpoint) {
            this.setState({ envMissing: true })
        }
    }
    
    render() {
        const { envMissing } = this.state;
        return (
            <div className="App-content">
                {envMissing && <p>Falta la variable de entorno REACT_APP_SERVER_ENDPOINT</p>}
                <Container>
                    <div className="g-title"><h3>Centro de Control</h3></div>
                    <GamesList/>
                </Container>
            </div>
        )
    }
}

export default Home