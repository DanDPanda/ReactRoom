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
      return <Username username={this.props.username} valid={true} />;
    } else if (this.props.inProgress) {
      return <Username valid={false} />;
    } else {
      return (
        <UsernameForm
          submitUsername={this.props.submitUsername}
          socket={this.props.socket}
          warning={this.state.warning}
        />
      );
    }
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
