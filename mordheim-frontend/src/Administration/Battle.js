import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import BattleModal from './Modals/BattleModal.js'

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
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
                {this.props.battle.place.namn}<br/>
                {battle_fought ? "Vinnare: " + this.props.battle.warbands.find(w => w.id == this.props.battle.winner_id).namn : <Button onClick={() => this._registerResult()}>Registrera resultat</Button>}

                <BattleModal onNewResult={(winner_id) => this.props.onNewResult(winner_id)} battle={this.props.battle} nearbyPlaces={this.props.battle.possible_retreats} show={this.state.showModal} hide={() => this._onHideModal()}/>
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