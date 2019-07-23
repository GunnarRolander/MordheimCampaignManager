import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';
import { SliderPicker } from 'react-color';
import { myConfig } from './config.js';

class CreateWarbandModal extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);

        this.state = {
            warbandName: '',
            warbandType: ''
        };
    }

    handleNameChange(e) {
        this.setState({ warbandName: e.target.value });
    }

    handleTypeChange(e) {
        this.setState({ warbandType: e.target.value });
    }

    handleColorChange = (color, event) => {
        this.setState({
            colourHex: color.hex,
            color: color.rgb
        })
      }

    handleColourChangeComplete = (color, event) => {
        this.setState({ 
            colourHex: color.hex,
            color: color.rgb 
        });
    };

    render() {
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>Skapa warband</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Warbandnamn</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.warbandName}
                                placeholder="Namn"
                                onChange={this.handleNameChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Typ av warband</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.warbandType}
                                placeholder="Namn"
                                onChange={this.handleTypeChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>                        
                    </form>
                    <SliderPicker color={this.state.color} onChangeComplete={ this.handleColourChangeComplete } onChange={ this.handleColorChange }/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=> this._hide()}>Stäng</Button>
                    <Button bsStyle="primary" onClick={() => this._createWarband()}>Skapa warband</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _hide() {
        this.props.hide();
    }

    _createWarband() {
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            let authUrl = myConfig.apiUrl + '/warband/create'
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(localStorage.getItem('username') + ":" + localStorage.getItem('password')).toString('base64'));
      
            fetch(authUrl, {method:'POST',
                headers: headers,
                body: JSON.stringify({
                    warband_name: this.state.warbandName,
                    warband_type: this.state.warbandType,
                    colour: this.state.colourHex
                })
            }).then((rsp) => {
                if (rsp.status == 200) {
                    this.props.getWarband();
                } else {
                    throw new Error("Failed logon")
                }
            })
        }
    }
}

    

export default CreateWarbandModal