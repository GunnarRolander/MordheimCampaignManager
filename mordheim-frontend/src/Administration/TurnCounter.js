import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class TurnCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 1,
            phase: 'Ordergivning'
        }
    }

    render() {
        return(
            <Panel>
                <Panel.Heading>Turn {this.state.turn}</Panel.Heading>
                <Panel.Body>Fas: {this.state.phase}</Panel.Body>
            </Panel>
        );
    }
}

export default TurnCounter