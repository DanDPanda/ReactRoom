import React, { Component } from "react";
import Username from "./Username";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: (
        <Username
          submitUsername={this.submitUsername}
          socket={this.props.socket}
          warning={false}
        />
      )
    };

    this.props.socket.on("username-result", sock => {
      if (sock.valid) {
        this.setState({ form: null });
      } else {
        alert("Username in use");
        this.setState({
          form: (
            <Username
              submitUsername={this.submitUsername}
              socket={this.props.socket}
              warning={true}
            />
          )
        });
        console.log("Username in use");
      }
    });
  }

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
        {this.state.form}
      </nav>
    );
  }
}

export default Header;
