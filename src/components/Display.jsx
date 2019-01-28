import React, { Component } from "react";
import Users from "./Users";
import Role from "./Role";

class Display extends Component {
  //TODO: Change this component name and make a new component for the roles
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
