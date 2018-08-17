import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import AdministrationPanel from './Administration/AdministrationPanel.js'
import Map from './Map/Map.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kulagheim!</h1>
        </header>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={8}>
              <Map></Map>
            </Col>
            <Col xs={6} md={4}>
              <AdministrationPanel></AdministrationPanel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
