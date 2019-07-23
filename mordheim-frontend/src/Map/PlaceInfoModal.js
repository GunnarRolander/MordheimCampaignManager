import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';
import marked from 'marked';

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
        let controllingWarband = this.props.visibleWarbands.find(w => w.id == this.props.place.warband_id)
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>{this.props.place.namn ? this.props.place.namn : "??????"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <strong>CPV: {this.props.cpv}</strong><br/>
                    <p dangerouslySetInnerHTML={{__html: marked(this.props.place.beskrivning ? this.props.place.beskrivning : "Unknown area", {sanitize: true})}} />
                    {controllingWarband ? <b><br/>Kontrolleras av {controllingWarband.namn}</b> : null}
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