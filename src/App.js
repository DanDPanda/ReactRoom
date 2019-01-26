import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Users from "./components/Users";
import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.socket = openSocket("http://localhost:8000");

    this.socket.on("update-msg", socket => {
      this.setState({ users: socket.clients });
    });
  }

  submitUsername = username => {
    this.socket.emit("submit_username", { username: username });
  };

  render() {
    return (
      <React.Fragment>
        <Header submitUsername={this.submitUsername} />
        <Users users={this.state.users} />
      </React.Fragment>
    );
  }
}

export default App;
