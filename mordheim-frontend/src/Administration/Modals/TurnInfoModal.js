import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Button, Modal} from 'react-bootstrap';
import { myConfig } from './../../config.js';

class TurnInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this._getList()
    }

    render() {
        let orderFas = this.props.turn.fas == "Ordergivning"
        return <div className="static-modal">
            <Modal show={this.props.show} onHide={()=> this._hide()}>
                <Modal.Header>
                    <Modal.Title>Order- och stridsinfo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {orderFas ? 'Warbands med inskickade ordrar:' : 'Kommande strider:'}
                    <br/>
                    <ListGroup>
                    {this.state.list.map((item, index) => {
                            return <ListGroupItem key={"stridOrder" + index}>{item}</ListGroupItem>
                        })}
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    {this.props.isAdmin? 
                        <Button onClick={() => this._nextClick()}>{orderFas ? 
                            "Nästa fas" 
                            : "Nästa runda"}
                        </Button>
                    : null}
                    <Button onClick={()=> this._hide()}>Stäng</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    _hide() {
        this.props.hide();
    }

    _nextClick() {
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            let authUrl = myConfig.apiUrl + '/turn/next_turn'
            if(this.props.turn.fas == "Ordergivning") {
                authUrl = myConfig.apiUrl + '/turn/next_phase'
            }
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(localStorage.getItem('username') + ":" + localStorage.getItem('password')).toString('base64'));
      
            fetch(authUrl, {method:'POST',
                headers: headers
            }).then((rsp) => {
                if (rsp.status == 200 || rsp.status == 204) {
                    rsp.json().then((data) =>{
                        if(data[0] && data[0] != 'N') {
                            alert("Orapporterade strider!")
                        } else {
                            this.props.refresh()
                            this.props.getTurn()                    
                        }
                    })
                } else {
                    throw new Error("Failed authentication")
                }
            })
        }
    }

    _getList() {
        if(localStorage.getItem('username') && localStorage.getItem('password')) {
            let authUrl = myConfig.apiUrl + '/turn/get_battles'
            if(this.props.turn.fas == "Ordergivning") {
                authUrl = myConfig.apiUrl + '/turn/get_actions'
            }
      
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
      
            //headers.append('Content-Type', 'text/json');
            headers.append('Authorization', 'Basic ' + new Buffer(localStorage.getItem('username') + ":" + localStorage.getItem('password')).toString('base64'));
      
            fetch(authUrl, {method:'GET',
                headers: headers
            }).then((rsp) => {
                if (rsp.status == 200 || rsp.status == 204) {
                    rsp.json().then((data) =>{
                        this._createList(data)
                    })
                } else {
                    throw new Error("Failed authentication")
                }
            })
        }
    }

    _createList(json_data) {
        let list = []
        if(this.props.turn.fas == "Ordergivning") {
            list = json_data.map((action, index) => {
                return action.warband.namn
            })
        } else {
            list = json_data.map((battle, index) => {
                let warband_names = battle.warbands.map((warband, index) => {
                    return warband.namn
                })
                return warband_names.join(' - ')
            })
        }

        this.setState({
            list: list
        })
    }
}

    

export default TurnInfoModal