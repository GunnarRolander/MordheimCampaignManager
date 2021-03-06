import React, { Component } from 'react';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import AdministrationPanel from './Administration/AdministrationPanel.js'
import Map from './Map/Map.js'
import './App.css';
import LoginModal from './LoginModal.js'
import CreateWarbandModal from './CreateWarbandModal.js';
import { myConfig } from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false,
      username: null,
      password: null,
      authenticated: false,
      warband: null,
      showFailedLogon: false
      }
  }

  componentDidMount(){
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')

    if (username && password ) {
      this._authenticate(username, password)
    } else {
      this.setState(
        {
          showLoginModal: true
        }
      )
    }
  }

  render() {
    let showMapAndAdmin = this.state.authenticated && this.state.warband.id != null
    let showCreateWarbandModal = this.state.authenticated && this.state.warband.id == null
    return (
      <div className="App">
        <header className="App-header">
          {this.state.authenticated ? <Button onClick={() => this._logOut()} className="pull-right"><Glyphicon glyph="lock" /></Button> : null}
          <h1 className="App-title">Kulagheim!</h1>
        </header>
        {showMapAndAdmin ? 
          <Grid>
            <Row className="show-grid">
              <Col className="customCol" xs={9} sm={9} md={9} xs={12}>
                <Map visiblePlaces={this.state.warband.visible_places} allPlaces={this.state.warband.all_places} visibleLinks={this.state.warband.visible_links} 
                visibleWarbands={this.state.warband.visible_warbands} battles={this.state.warband.battles}/>
              </Col>
              <Col className="customCol" xs={3} sm={3} md={3} xs={12}>
                <AdministrationPanel warband={this.state.warband} refresh={() => this._authenticate(this.state.username, this.state.password)}></AdministrationPanel>
              </Col>
            </Row>
          </Grid> 
        : null}
        <LoginModal show={this.state.showLoginModal} hide={()=> this._hideModal()} authenticate={(username, password) => this._authenticate(username, password)} showFailedLogon={this.state.showFailedLogon}></LoginModal>
        <CreateWarbandModal show={showCreateWarbandModal} hide={()=> this._hideModal()} getWarband={() => this._authenticate(this.state.username, this.state.password)}/>
      </div>
    );
  }

  _hideModal(){
    this.setState({
      showLoginModal: false
    })
  }

  _authenticate(username, password){
    if(username && password) {
      let authUrl = myConfig.apiUrl + '/warband'

      let headers = new Headers()

      //headers.append('Content-Type', 'text/json');
      headers.append('Authorization', 'Basic ' + new Buffer(username + ":" + password).toString('base64'));

      fetch(authUrl, {method:'GET',
        headers: headers,
      }).then((rsp) => {
        if (rsp.status == 200) {
          rsp.json().then((data) =>{
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            this.setState({
              username: username,
              password: password,
              authenticated: true,
              warband: data,
              showLoginModal: false
            })
          })
          
        } else if (rsp.status == 401) {
          this.setState(
            {
              showFailedLogon: true,
              showLoginModal: true
          })
        } else {
          throw new Error("Failed logon")
        }
      })
    }
  }

  _logOut(){
    localStorage.setItem('username', null)
    localStorage.setItem('password', null)
    this.setState({
      showLoginModal: true,
      username: null,
      password: null,
      authenticated: false,
      warband: null
      })
  }
}

export default App;
