import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import TurnCounter from './TurnCounter.js'
import BattleList from './BattleList.js'
import Order from './Order.js'

class AdministrationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: null
        }
    }
    
    componentDidMount() {
        this._getTurn();
    }

    render() {
        if (this.state.turn == null) {
            return <div></div>
        }
        return(
            <div>
                <TurnCounter turn={this.state.turn} isAdmin={true} getTurn={() => this._getTurn()} refresh={() => this.props.refresh()}></TurnCounter>

                <Order turn={this.state.turn} warband={this.props.warband}></Order>

                <BattleList turn={this.state.turn} battles={this.props.warband.battles} refresh={() => this.props.refresh()}></BattleList>
            </div>
        )
    }

    _getTurn() {
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            let authUrl = 'http://localhost:3000/turn'
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(localStorage.getItem('username') + ":" + localStorage.getItem('password')).toString('base64'));
      
            fetch(authUrl, {method:'GET',
                headers: headers
            }).then((rsp) => {
                if (rsp.status == 200) {
                    rsp.json().then((data) =>{
                        this.setState({                          
                          turn: data                          
                        })
                      })               
                } else {
                    throw new Error("Failed authentication")
                }
            })
        }
    }
}

export default AdministrationPanel