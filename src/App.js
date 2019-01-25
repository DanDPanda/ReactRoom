import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Users from "./components/Users";

class App extends Component {
  state = {
    users: [{ id: 1, name: "Dan" }, { id: 2, name: "Man" }]
  };
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
