import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class TurnCounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.turn == null) {
            return <div></div>
        }
        return(
            <Panel>
                <Panel.Heading>Runda {this.props.turn.nummer}</Panel.Heading>
                <Panel.Body>Fas: {this.props.turn.fas}</Panel.Body>
                {this.props.isAdmin ? 
                <Panel.Footer>
                    <Button onClick={() => this._nextClick()}>{this.props.turn.fas == "Ordergivning" ? 
                    "Nästa fas" 
                    : "Nästa runda"}</Button>
                </Panel.Footer> 
                : null}
            </Panel>
        );
    }

    _nextClick() {
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            let authUrl = 'http://localhost:3000/turn/next_turn'
            if(this.props.turn.fas == "Ordergivning") {
                authUrl = 'http://localhost:3000/turn/next_phase'
            }
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(localStorage.getItem('username') + ":" + localStorage.getItem('password')).toString('base64'));
      
            fetch(authUrl, {method:'POST',
                headers: headers
            }).then((rsp) => {
                if (rsp.status == 200 || rsp.status == 204) {
                    rsp.json().then((data) =>{
                        if(data[0] && data[0] != 'N') {
                            alert("Orapporterade strider!")
                        } else {
                            this.props.refresh()
                            this.props.getTurn()                    
                        }
                    })
                } else {
                    throw new Error("Failed authentication")
                }
            })
        }
    }
}

export default TurnCounter