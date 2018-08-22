import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import AdministrationPanel from './Administration/AdministrationPanel.js'
import Map from './Map/Map.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
             warband: {"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-21T14:55:35.446Z","updated_at":"2018-08-21T14:55:35.446Z","visible_places":[{"id":1,"namn":"Testarea 1","beskrivning":"Testest","latlng":null,"warband_id":1,"created_at":"2018-08-21T14:55:35.369Z","updated_at":"2018-08-21T14:55:35.478Z"},{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.378Z","updated_at":"2018-08-21T14:55:35.484Z"},{"id":4,"namn":"Testarea 4","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.503Z","updated_at":"2018-08-21T14:55:35.503Z"}],"current_action":[{"id":1,"typ":null,"turn_id":2,"warband_id":1,"place_id":1,"created_at":"2018-08-21T14:55:35.740Z","updated_at":"2018-08-21T14:55:35.740Z"}],"place":{"id":1,"namn":"Testarea 1","beskrivning":"Testest","latlng":null,"warband_id":1,"created_at":"2018-08-21T14:55:35.369Z","updated_at":"2018-08-21T14:55:35.478Z","linked_places":[{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.378Z","updated_at":"2018-08-21T14:55:35.484Z"},{"id":4,"namn":"Testarea 4","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.503Z","updated_at":"2018-08-21T14:55:35.503Z"}]},"battles":[{"id":1,"winner_id":null,"place_id":2,"turn_id":2,"scenario":null,"created_at":"2018-08-21T14:55:35.636Z","updated_at":"2018-08-21T14:55:35.636Z","possible_retreats":[{"id":3,"namn":"Testarea 3","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.495Z","updated_at":"2018-08-21T14:55:35.495Z"}],"warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-21T14:55:35.446Z","updated_at":"2018-08-21T14:55:35.446Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-21T14:55:35.467Z","updated_at":"2018-08-21T14:55:35.467Z"}],"place":{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.378Z","updated_at":"2018-08-21T14:55:35.484Z"}},{"id":2,"winner_id":1,"place_id":2,"turn_id":1,"scenario":null,"created_at":"2018-08-21T14:55:35.681Z","updated_at":"2018-08-21T14:55:35.681Z","possible_retreats":[{"id":3,"namn":"Testarea 3","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.495Z","updated_at":"2018-08-21T14:55:35.495Z"}],"warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-21T14:55:35.446Z","updated_at":"2018-08-21T14:55:35.446Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-21T14:55:35.467Z","updated_at":"2018-08-21T14:55:35.467Z"}],"place":{"id":2,"namn":"Testarea 2","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.378Z","updated_at":"2018-08-21T14:55:35.484Z"}},{"id":3,"winner_id":null,"place_id":4,"turn_id":2,"scenario":null,"created_at":"2018-08-21T14:55:35.702Z","updated_at":"2018-08-21T14:55:35.702Z","possible_retreats":[],"warbands":[{"id":1,"namn":"Hexenjaeger","typ":"Witch Hunters","place_id":1,"spelare_id":1,"created_at":"2018-08-21T14:55:35.446Z","updated_at":"2018-08-21T14:55:35.446Z"},{"id":2,"namn":"Sigmarssystrarna","typ":"Sisters of Sigmar","place_id":2,"spelare_id":2,"created_at":"2018-08-21T14:55:35.467Z","updated_at":"2018-08-21T14:55:35.467Z"}],"place":{"id":4,"namn":"Testarea 4","beskrivning":"Testest","latlng":null,"warband_id":2,"created_at":"2018-08-21T14:55:35.503Z","updated_at":"2018-08-21T14:55:35.503Z"}}]}
    }
  }

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
              <AdministrationPanel warband={this.state.warband}></AdministrationPanel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
