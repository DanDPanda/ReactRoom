import React, { Component } from "react";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Additional from "./components/Additional/Additional";
import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      role: null,
      additional: null,
      game: null
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

  render() {
    return (
      <React.Fragment>
        <Header socket={this.socket} inProgress={this.state.inProgress} />
        <Display
          socket={this.socket}
          inProgress={this.state.inProgress}
          role={this.state.role}
        />
        <Additional
          additional={this.state.additional}
          inProgress={this.state.inProgress}
          game={this.state.game}
        />
      </React.Fragment>
    );
  }
}

export default App;
