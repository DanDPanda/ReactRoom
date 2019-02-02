/**
 * The header class is the bar at the top of the screen.
 * At the moment, the main function of this component is to allow users to
 * view and input their usernames.
 */

import React, { Component } from "react";
import UsernameForm from "./HeaderChildren/UsernameForm";
import Username from "./HeaderChildren/Username";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      username: "",
      warning: false
    };

    this.props.socket.on("username-result", sock => {
      if (sock.valid) {
        this.setState({ valid: true });
      } else {
        this.setState({ warning: true });
      }
    });
  }

  getForm = () => {
    if (this.state.valid) {
      return <Username username={this.state.username} valid={true} />;
    } else if (this.props.inProgress) {
      return <Username username="" valid={false} />;
    } else {
      return (
        <UsernameForm
          submitUsername={this.submitUsername}
          socket={this.props.socket}
          warning={this.state.warning}
        />
      );
    }
  };

  submitUsername = username => {
    this.setState({ username: username });
    this.props.socket.emit("submit-username", { username: username });
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <p
          className="navbar-brand"
          style={{ color: "white", paddingBottom: "0" }}
        >
          Game Room
        </p>
        {this.getForm()}
      </nav>
    );
  }
}

export default Header;
