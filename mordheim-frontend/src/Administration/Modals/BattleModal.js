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
                        <FormControl componentClass="select" onChange={(e) => this._onChangeWinner(e)}>
                            <option value="" selected disabled>Välj vinnare</option>
                            <option value={this.props.battle.warbands[0].id}>{this.props.battle.warbands[0].namn}</option>
                            <option value={this.props.battle.warbands[1].id}>{this.props.battle.warbands[1].namn}</option>
                        </FormControl>
                    </FormGroup>
                    {this.state.showLoserMove ? 
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>{this.state.loser.namn} retirerar till:</ControlLabel>
                        <FormControl componentClass="select" onChange={(e) => this._onChangeLoserMove(e)}>
                            <option value="" selected disabled>Välj plats</option>
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

    _onChangeWinner(e) {
        let winner_id = e.target.value
        let loser = this.props.battle.warbands[0].id == winner_id ? this.props.battle.warbands[1]: this.props.battle.warbands[0]
        let showLoserMove = this.props.battle.place.warband_id == loser.id && loser.place_id == this.props.battle.place_id
        
        this.setState({
            showLoserMove: showLoserMove,
            loser: loser,
            winner_id: winner_id
        })
    }

    _onChangeLoserMove(e) {
        this.setState({
            loser_move_place_id: e.target.value
        })
    }

    _saveResult(){
        if(global.username && global.password) {
            let authUrl = 'http://localhost:3000/battles/register_result'
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(global.username + ":" + global.password).toString('base64'));
      
            fetch(authUrl, {method:'POST',
                headers: headers,
                body: JSON.stringify({
                    winner_id: this.state.winner_id,
                    battle_id: this.props.battle.id,
                    loser_move_place_id: this.state.loser_move_place_id
                })
            }).then((rsp) => {
                if (rsp.status == 200 || rsp.status == 204) {
                    this._hide()
                    this.props.onNewResult(this.state.winner_id)
                } else {
                    throw new Error("Failed logon")
                }
            })
        }

    }

    _hide() {
        this.props.hide();
    }
}

    

export default BattleModal