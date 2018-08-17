import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import TurnCounter from './TurnCounter.js'
import BattleList from './BattleList.js'

class AdministrationPanel extends Component {
    render() {
        return(
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <TurnCounter></TurnCounter>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <BattleList></BattleList>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default AdministrationPanel