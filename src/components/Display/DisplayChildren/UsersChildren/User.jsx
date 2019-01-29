import React, { Component } from "react";

class User extends Component {
  render() {
    return <li className="list-group-item">{this.props.user}</li>;
  }
}

export default User;
