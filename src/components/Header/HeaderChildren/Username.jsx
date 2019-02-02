/**
 * This is the username that is displayed when the user is finished inputting their
 * username.
 */

import React, { Component } from "react";

class Username extends Component {
  getUsername = () => {
    const usernameStyle = {
      cursor: "auto",
      backgroundColor: "#17a2b8",
      color: "white",
      borderRadius: "0.25rem"
    };
    if (this.props.valid) {
      return (
        <p style={usernameStyle} className="btn btn-outline-info my-2 my-sm-0">
          Username: {this.props.username}
        </p>
      );
    } else {
      return (
        <p style={usernameStyle} className="btn btn-outline-info my-2 my-sm-0">
          Submit a username after the game ends
        </p>
      );
    }
  };

  render() {
    return <div className="form-inline">{this.getUsername()}</div>;
  }
}
export default Username;
