import React, { Component } from 'react';
import {Grid, FormControl, ControlLabel, Button, FormGroup, Modal} from 'react-bootstrap';

class BattleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoserMove: false,
            loser: null
        }
    }

    render() {
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>Rapportera stridsresultat</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Vinnare:</ControlLabel>
                        <FormControl componentClass="select" placeholder="Vem vann?" onChange={(e) => this._onChange(e)}>
                            <option value={this.props.battle.warbands[0].id}>{this.props.battle.warbands[0].namn}</option>
                            <option value={this.props.battle.warbands[1].id}>{this.props.battle.warbands[1].namn}</option>
                        </FormControl>
                    </FormGroup>
                    {this.state.showLoserMove ? 
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>{this.state.loser.namn} retirerar till:</ControlLabel>
                        <FormControl componentClass="select">
                            {this.props.nearbyPlaces.map(function(place, index){
                                return <option value={place.id}>{place.namn}</option>
                            })}
                        </FormControl>
                    </FormGroup> : null }
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={()=> this._hide()}>Avbryt</Button>
                    <Button bsStyle="primary" onClick={()=> this._saveResult()}>Skicka in</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _onChange(e) {
        let winner_id = e.target.value
        let loser = this.props.battle.warbands[0].id == winner_id ? this.props.battle.warbands[1]: this.props.battle.warbands[0]
        let showLoserMove = this.props.battle.place.warband_id == loser.id
        
        this.setState({
            showLoserMove: showLoserMove,
            loser: loser,
            winner_id: winner_id
        })
    }

    _saveResult(){
        this.props.onNewResult(this.state.winner_id)
    }

    _hide() {
        this.props.hide();
    }
}

    

export default BattleModal