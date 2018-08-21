import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import BattleModal from './Modals/BattleModal.js'

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            nearbyPlaces: [{"id":4,"namn":"Testarea 4","beskrivning":"Testest","latlng":null,"warband_id":null,"created_at":"2018-08-21T07:33:25.122Z","updated_at":"2018-08-21T07:33:25.122Z"}]
        }
    }

    render() {
        let battle_fought = true
        if(this.props.battle.winner_id == null) {
            battle_fought = false
        }
        return(
            <div>
                {this.props.index == 0 ? null : <hr />}
                <b>{this.props.battle.warbands[0].namn}</b> - <b>{this.props.battle.warbands[1].namn}</b><br/>
                {this.props.battle.place.namn} ({this.props.battle.place.id})<br/>
                {battle_fought ? "Vinnare: " + this.props.battle.warbands[this.props.battle.winner_id].namn : <Button onClick={() => this._registerResult()}>Registrera resultat</Button>}

                <BattleModal battle={this.props.battle} nearbyPlaces={this.state.nearbyPlaces} show={this.state.showModal} hide={() => this._onHideModal()}/>
            </div>
        )
    }

    _registerResult() {
        this.setState({
            showModal: true
        })
    }

    _onHideModal(){
        this.setState({
            showModal: false
        })
    }
}

export default Battle