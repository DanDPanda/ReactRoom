import React, { Component } from "react";
import Users from "./DisplayChildren/Users";
import Role from "./DisplayChildren/Role";

class Display extends Component {
  getProgress = () => {
    if (this.props.inProgress) {
      return <Role role={this.props.role} />;
    } else {
      return <Users socket={this.props.socket} />;
    }
  };

  render() {
    return <div>{this.getProgress()}</div>;
  }
}

export default Display;
