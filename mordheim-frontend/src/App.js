import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import AdministrationPanel from './Administration/AdministrationPanel.js'
import Map from './Map/Map.js'
import logo from './logo.svg';
import './App.css';
import LoginModal from './LoginModal.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: true,
      username: null,
      password: null,
      authenticated: false,
      warband: null
      }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kulagheim!</h1>
        </header>
        {this.state.authenticated ? 
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={9}>
                <Map></Map>
              </Col>
              <Col xs={6} md={3}>
                <AdministrationPanel warband={this.state.warband}></AdministrationPanel>
              </Col>
            </Row>
          </Grid> 
        : null}
        <LoginModal show={this.state.showLoginModal} hide={()=> this._hideModal()} authenticate={(username, password) => this._authenticate(username, password)}></LoginModal>
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
      let authUrl = 'http://localhost:3000/warband'

      let headers = new Headers()

      //headers.append('Content-Type', 'text/json');
      headers.append('Authorization', 'Basic ' + new Buffer(username + ":" + password).toString('base64'));

      fetch(authUrl, {method:'GET',
        headers: headers,
      }).then((rsp) => {
        if (rsp.status == 200) {
          rsp.json().then((data) =>{
            global.username = username
            global.password = password
            this.setState({
              username: username,
              password: password,
              authenticated: true,
              warband: data,
              showLoginModal: false
            })
          })
        } else {
          throw new Error("Failed logon")
        }
      })
    }
  }
}

export default App;
