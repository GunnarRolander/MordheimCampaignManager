import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class BattleList extends Component {
    render() {
        return(
            <Panel>
                <Panel.Heading>Kommande strider</Panel.Heading>
                <Panel.Body>Jens SigmarSystrar <Button>Registrera resultat</Button></Panel.Body>
            </Panel>
        );
    }
}

export default BattleList