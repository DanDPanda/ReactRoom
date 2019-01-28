import React, { Component } from "react";
import UsernameForm from "./UsernameForm";
import Username from "./Username";

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
    if (this.state.valid || this.props.inProgress) {
      return <Username username={this.state.username} />;
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
