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

    this.socket.on("update-msg", sock => {
      this.setState({ users: sock.clients });
    });

    this.socket.emit("get-list");
  }

  render() {
    return (
      <React.Fragment>
        <Header
          submitUsername={this.submitUsername}
          form={this.state.form}
          socket={this.socket}
        />
        <Users users={this.state.users} />
      </React.Fragment>
    );
  }
}

export default App;
