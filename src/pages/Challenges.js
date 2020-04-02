import React from 'react';
import axios from 'axios'
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en'
import Button from 'react-bootstrap/Button'

const endpoint = process.env.REACT_APP_SERVER_ENDPOINT

class GamePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameName: null,
            challenges: null,
            error: null
        }
        this.id = this.props.match.params.id
        this.getGameData()
        this.onChange = this.onChange.bind(this)
        this.updateJson = this.updateJson.bind(this)
    }


    onChange = (e) => {
        if(e && e.jsObject) {
            this.setState({ challenges: e.jsObject })
        }
    }

    updateJson = () => {
        this.setState({ error: null })
        var r = window.confirm("¿Confirmas guardar los cambios?");
        if (!r) return

        axios.put(endpoint+"/games/"+this.id+"/updateChallenges", this.state.challenges)
        .then(res => {
            if (res.data.error) {
                this.setState({ error: "No se ha podido actualizar la información: "+res.data.error })
            }
            else {
                alert("Guardado correctamente")
                console.log(res.data.result);
            }
        })
        .catch(error => this.setState({ error: error.message }));
    }

    getGameData = () => {
        axios.get(endpoint+"/games/"+this.id+"/challenges")
        .then(res => {
            this.setState({
                error: null,
                gameName: res.data.name,
                challenges: res.data.info
            })
        })
        .catch(error => this.setState({ error: error.message }));
    }

    render() {

        // if(!this.state.challenges) return <div>No challenges</div>
        return ( 
            <React.Fragment>
                {this.state.error && <div>{this.state.error}</div>}
                <h3>{this.state.gameName}</h3>
                <JSONInput
                    id          = 'a_unique_id'
                    placeholder = { this.state.challenges }
                    locale      = { locale }
                    width       = '100%'
                    height      = 'calc(100vh - 80px)'
                    min-height  = '100px'
                    onChange    = {this.onChange}
                    waitAfterKeyPress	= '10000'
                />
                <Button onClick={this.updateJson}>Guardar Cambios</Button>
            </React.Fragment>
        )
    }
}

export default GamePanel