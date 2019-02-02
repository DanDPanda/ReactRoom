/**
 * This is how each user will be displayed.
 */

import React, { Component } from "react";

class User extends Component {
  render() {
    const userStyle = {
      marginTop: "5px"
    };
    return (
      <li className="list-group-item" style={userStyle}>
        {this.props.user}
      </li>
    );
  }
}

export default User;
