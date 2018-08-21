import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import TurnCounter from './TurnCounter.js'
import BattleList from './BattleList.js'
import Order from './Order.js'

class AdministrationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: {"id":2,"nummer":2,"fas":"Order","created_at":"2018-08-20T09:19:11.455Z","updated_at":"2018-08-20T09:19:11.455Z"}
        }
    }

    render() {
        return(
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <TurnCounter turn={this.state.turn}></TurnCounter>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <Order turn={this.state.turn} action={this.props.warband.current_action}></Order>
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
}

export default AdministrationPanel