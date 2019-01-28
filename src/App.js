import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Users from "./components/Users";
import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      role: ""
    };

    this.socket = openSocket("http://192.168.0.13:8000");

    this.socket.on("game-start", sock => {
      this.setState({ inProgress: sock.inProgress, role: sock.role });
    });

    this.socket.on("restart", sock => {
      this.setState({ inProgress: sock.inProgress, role: sock.role });
    });

    this.socket.emit("get-progress");
  }

  render() {
    return (
      <React.Fragment>
        <Header
          submitUsername={this.submitUsername}
          socket={this.socket}
          inProgress={this.state.inProgress}
        />
        <Users
          socket={this.socket}
          inProgress={this.state.inProgress}
          role={this.state.role}
        />
      </React.Fragment>
    );
  }
}

export default App;
