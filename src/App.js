import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Users from "./components/Users";
import openSocket from "socket.io-client";

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    const socket = openSocket("http://localhost:8000");
    socket.on(
      "update-msg",
      // data => console.log(data.clients)
      data => this.setState({ users: data.clients })
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Users users={this.state.users} />
      </React.Fragment>
    );
  }
}

export default App;
