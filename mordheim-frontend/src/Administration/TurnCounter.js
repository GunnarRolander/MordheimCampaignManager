import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class TurnCounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Panel>
                <Panel.Heading>Turn {this.props.turn.nummer}</Panel.Heading>
                <Panel.Body>Fas: {this.props.turn.fas}</Panel.Body>
            </Panel>
        );
    }
}

export default TurnCounter