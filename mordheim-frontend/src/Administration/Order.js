import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import OrderModal from './Modals/OrderModal.js'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: this.props.action,
            showModal: false,
            orderText: null
        }
    }

    render() {
        let orderText;
        if (this.state.action == null) {
            orderText = <Button nearbyPlaces={this.props.warband.place.linked_places} onClick={() => this._openOrderModal()}>Ge order</Button>
        } else {
            if (this.state.action.place_id == this.props.warband.place_id) {
            } else {
                let place = this.props.warband.visible_places.find(p => p.id == this.state.action.place_id)
            }
        }
        return(
            <Panel defaultExpanded={this.props.turn.fas == "Ordergivning"}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        Order
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        Order för runda {this.props.turn.nummer}:<br/>
                        {this.state.orderText == null ? "Inget - ge en order!" : this.state.orderText}<br/>
                        <hr/>
                        <Button onClick={() => this._openOrderModal()}>{this.state.orderText == null ? "Ge order" : "Ändra order"}</Button>
                    </Panel.Body>
                </Panel.Collapse>
                <OrderModal nearbyPlaces={this.props.warband.place.linked_places} currentPlace={this.props.warband.place} existingAction={this.state.action} updateAction={(l, id) => this._updateAction(l, id)} show={this.state.showModal} hide={() => this._hideOrderModal()}/>
            </Panel>
        )
    }

    _openOrderModal() {
        this.setState({
            showModal: true
        })
    }

    _hideOrderModal() {
        this.setState({
            showModal: false
        })
    }

    _updateAction(label, place_id) {

        if(global.username && global.password) {
            let authUrl = 'http://localhost:3000/actions/register_action'
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(global.username + ":" + global.password).toString('base64'));
      
            fetch(authUrl, {method:'POST',
                headers: headers,
                body: JSON.stringify({
                    warband_id: this.props.warband.id,
                    destination_id: place_id
                })
            }).then((rsp) => {
                if (rsp.status == 200) {
                    rsp.json().then((data) =>{
                    })
                } else {
                    throw new Error("Failed logon")
                }
            })
        }

        console.log(label, place_id)
        let newAction = this.state.action || {}
        newAction.place_id = place_id
        this.setState({
            orderText: label,
            action: newAction
        })
    }
}

export default Order