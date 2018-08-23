import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import "./Login.css";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.authenticate(this.state.username, this.state.password)
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.props.show} onHide={()=> this._hide()}>
          <Modal.Header>
            <Modal.Title>Logga in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                  <ControlLabel>Användarnamn</ControlLabel>
                  <FormControl
                    autoFocus
                    type="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Lösenord</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
