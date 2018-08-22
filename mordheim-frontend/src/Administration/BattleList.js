import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import Battle from './Battle.js'

class BattleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battles: this.props.battles
        }
    }

    render() {
        let coming_battles = this.state.battles.filter(battle => battle.winner_id == null)
        let finished_battles = this.state.battles.filter(battle => battle.winner_id != null)
        return(
        <div>
            <Panel defaultExpanded={this.props.turn.fas == "Strid"}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        Kommande strider
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        {coming_battles.map(function(battle, index){
                            return <Battle key={"cBattle"+index} battle={battle} index={index} onNewResult={(winner_id) => {this._onNewResult(battle.id, winner_id)}}/>
                        })}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
            <Panel>
                <Panel.Heading>
                    <Panel.Title toggle>
                        Tidigare strider
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        {finished_battles.map(function(battle, index){
                            return <Battle key={"fBattle"+index} battle={battle} index={index}/>
                        })}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        </div>
            
        );
    }

    _onNewResult(battle_id, winner_id){
        let battles = this.state.battles
        battles.find(b => b.id = battle_id).winner_id = winner_id

        this.setState({
            battles: battles
        })
    }
}

export default BattleList