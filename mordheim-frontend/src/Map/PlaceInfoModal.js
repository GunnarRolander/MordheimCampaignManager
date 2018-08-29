import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';

class PlaceInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null
        }
    }

    render() {
        if (this.props.place == null) {
            return <div></div>
        }
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>{this.props.place.namn} ({this.props.place.nummer})</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.place.beskrivning}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=> this._hide()}>Stäng</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _hide() {
        this.props.hide();
    }
}

    

export default PlaceInfoModal