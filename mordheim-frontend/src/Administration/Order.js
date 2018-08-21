import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return(
            <Panel defaultExpanded={this.props.turn.fas == "Order"}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        Order
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <b>Runda {this.props.turn.nummer}</b><br/>
                   
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        )
    }
}

export default Order