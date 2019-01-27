import React, { Component } from "react";
import Username from "./Username";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false
    };

    this.props.socket.on("username-result", sock => {
      if (sock.valid) {
        this.setState({ valid: true });
      }
    });
  }

  getForm = () => {
    if (this.state.valid || this.props.inProgress) {
      return null;
    } else {
      return (
        <Username
          submitUsername={this.submitUsername}
          socket={this.props.socket}
          warning={false}
        />
      );
    }
  };

  submitUsername = username => {
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
