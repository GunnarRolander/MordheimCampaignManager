import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.action,
            shoeOrderModal: false
        }
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
                        {this.state.action == nil ? <Button onClick={() => _openOrderModal()}>Ge order</Button> :
                        'Gå till ' + this.props.warband.visible_places.find(p => p.id == this.state.action.place_id)}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>

        )
    }

    _openOrderModal() {
        this.setState({
            showOrderModal: true
        })
    }

    _hideOrderModal() {
        this.setState({
            showOrderModal: false
        })
    }
}

export default Order