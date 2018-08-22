import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import Battle from './Battle.js'

class BattleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battles: [{"id":1,"winner_id":null,"place_id":2,"turn_id":2,"scenario":null,"created_at":"2018-08-20T09:19:11.486Z","updated_at":"2018-08-20T09:19:11.486Z","warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-20T09:19:11.349Z","updated_at":"2018-08-20T09:19:11.349Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-20T09:19:11.366Z","updated_at":"2018-08-20T09:19:11.366Z"}],"place":{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-20T09:19:11.307Z","updated_at":"2018-08-20T09:19:11.375Z"}},
            {"id":2,"winner_id":1,"place_id":2,"turn_id":1,"scenario":null,"created_at":"2018-08-20T09:19:11.510Z","updated_at":"2018-08-20T09:19:11.510Z","warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-20T09:19:11.349Z","updated_at":"2018-08-20T09:19:11.349Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-20T09:19:11.366Z","updated_at":"2018-08-20T09:19:11.366Z"}],"winner":{"id":1, "namn":"Hexenjäger"},"place":{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-20T09:19:11.307Z","updated_at":"2018-08-20T09:19:11.375Z"}},
            {"id":3,"winner_id":null,"place_id":4,"turn_id":2,"scenario":null,"created_at":"2018-08-21T07:33:25.268Z","updated_at":"2018-08-21T07:33:25.268Z","warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-21T07:33:25.069Z","updated_at":"2018-08-21T07:33:25.069Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-21T07:33:25.079Z","updated_at":"2018-08-21T07:33:25.079Z"}],"place":{"id":4,"namn":"Testarea 4","beskrivning":"Testest","latlng":null,"warband_id":null,"created_at":"2018-08-21T07:33:25.122Z","updated_at":"2018-08-21T07:33:25.122Z"}}]
        }
    }

    render() {
        let coming_battles = this.props.battles.filter(battle => battle.winner_id == null)
        let finished_battles = this.props.battles.filter(battle => battle.winner_id != null)
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
                            return <Battle key={"cBattle"+index} battle={battle} index={index}/>
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
}

export default BattleList