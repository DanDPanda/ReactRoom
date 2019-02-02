/**
 * This component displays the users or the current role of the player.
 *
 * TODO: Need to fix this when users get moved out.
 */

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
    return this.getProgress();
  }
}

export default Display;
