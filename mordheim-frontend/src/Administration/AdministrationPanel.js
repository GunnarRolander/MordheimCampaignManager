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
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <TurnCounter turn={this.state.turn} isAdmin={true} getTurn={() => this._getTurn()}></TurnCounter>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <Order turn={this.state.turn} warband={this.props.warband}></Order>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <BattleList turn={this.state.turn} battles={this.props.warband.battles}></BattleList>
                    </Col>
                </Row>
            </Grid>
        )
    }

    _getTurn() {
        if(global.username && global.password) {
            let authUrl = 'http://localhost:3000/turn'
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(global.username + ":" + global.password).toString('base64'));
      
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