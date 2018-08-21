import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';

class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        <ControlLabel>Flytta warband till:</ControlLabel>
                        <FormControl componentClass="select" placeholder="Flytta till" onChange={(e) => this._onChange(e)}>
                            {this.props.nearbyPlaces.map(function(place, index){
                                return <option value={place.id}>{place.namn}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=> this._hide()}>Avbryt</Button>
                    <Button bsStyle="primary">Skicka in</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _onChange(e) {        
        this.setState({
            showLoserMove: showLoserMove,
            loser: loser
        })
    }

    _hide() {
        this.props.hide();
    }
}

    

export default OrderModal