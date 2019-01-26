import React, { Component } from "react";
import Username from "./Username";

class Header extends Component {
  state = {
    value: ""
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
        <Username submitUsername={this.props.submitUsername} />
      </nav>
    );
  }
}

export default Header;
