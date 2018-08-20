import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let battle_fought = true
        if(this.props.battle.winner_id == null) {
            battle_fought = false
        }
        return(
            <div><b>{this.props.battle.warbands[0].namn}</b> - <b>{this.props.battle.warbands[1].namn}</b><br/>
                {this.props.battle.place.namn} ({this.props.battle.place.id})<br/>
                {battle_fought ? "Vinnare: " + this.props.battle.winner.namn : <Button>Skicka in resultat</Button>}
            </div>
        )
    }
}

export default Battle