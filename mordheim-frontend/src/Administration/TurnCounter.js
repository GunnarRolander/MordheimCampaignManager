import React, { Component } from 'react';
import {Grid, Row, Col, Button, Panel} from 'react-bootstrap';
import TurnInfoModal from './Modals/TurnInfoModal.js'

class TurnCounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTurnInfoModal: false
        }
    }

    render() {
        if (this.props.turn == null) {
            return <div></div>
        }
        return(
            <div>
                <Panel>
                    <Panel.Heading>Runda {this.props.turn.nummer}</Panel.Heading>
                    <Panel.Body>Fas: {this.props.turn.fas}</Panel.Body>
                    <Panel.Footer>
                        <Button onClick={() => this._openTurnInfoModal()}>Status</Button>
                    </Panel.Footer> 
                </Panel>
                <TurnInfoModal turn={this.props.turn} isAdmin={this.props.isAdmin} 
                    show={this.state.showTurnInfoModal} hide={() => this._hideTurnInfoModal()}
                    refresh={() => this.props.refresh()} getTurn={() => this.props.getTurn()}/>
            </div>
        );
    }

    _openTurnInfoModal() {
        this.setState({
            showTurnInfoModal: true
        })
    }

    _hideTurnInfoModal() {
        this.setState({
            showTurnInfoModal: false
        })
    }
}

export default TurnCounter