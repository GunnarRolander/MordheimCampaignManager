import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';

class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToId: this.props.existingAction? this.props.existingAction.id : null,
            orderText: null
        }
    }

    render() {
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>Ge order</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Välj order</ControlLabel>
                        <FormControl componentClass="select" placeholder="Flytta till" value={this.state.moveToId} onChange={(e) => this._onChange(e)}>
                            <option value="" selected disabled>Välj plats</option>
                            {this.props.nearbyPlaces.map(function(place, index){
                                return <option key={"orderOption"+index} value={place.id}>Flytta till {place.namn} ({place.nummer})</option>
                            })}
                            <option key={"orderOptionNuvarande"} value={this.props.currentPlace.id}>Flyttar ej, stannar på {this.props.currentPlace.namn} ({this.props.currentPlace.nummer})</option>
                        </FormControl>
                    </FormGroup>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=> this._hide()}>Avbryt</Button>
                    <Button bsStyle="primary" onClick={() => this._sendOrder()}>Skicka in</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _sendOrder(){
        this.props.updateAction(this.state.orderText, this.state.moveToId)
        this._hide()
    }

    _onChange(e) {      
        this.setState({
            moveToId: e.target.value,
            orderText: e.target.selectedOptions[0].label
        })
    }

    _hide() {
        this.props.hide();
    }
}

    

export default OrderModal