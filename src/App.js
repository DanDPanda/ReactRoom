/**
 * At  the moment, the App has three component parts.
 * The header, the display, and the additional.
 */

import React, { Component } from "react";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Additional from "./components/Additional/Additional";
import Buttons from "./components/Buttons/Buttons";
import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      role: null,
      additional: null,
      game: null,
      username: null
    };

    this.socket = openSocket("http://localhost:8000");

    this.socket.on("game", sock => {
      this.setState({
        inProgress: sock.inProgress,
        role: sock.role,
        additional: sock.additional,
        game: sock.game
      });
    });

    this.socket.emit("get-progress");
  }

  submitUsername = username => {
    this.setState({ username: username });
    this.socket.emit("submit-username", { username: username });
  };

  render() {
    return (
      <React.Fragment>
        <Header
          socket={this.socket}
          inProgress={this.state.inProgress}
          username={this.state.username}
          submitUsername={this.submitUsername}
        />
        <Display
          socket={this.socket}
          inProgress={this.state.inProgress}
          role={this.state.role}
        />
        <Additional
          additional={this.state.additional}
          inProgress={this.state.inProgress}
          game={this.state.game}
          role={this.state.role}
        />
        <Buttons
          socket={this.socket}
          inProgress={this.state.inProgress}
          username={this.state.username}
        />
      </React.Fragment>
    );
  }
}

export default App;
