import React, { Component } from "react";
import Username from "./Username";

class Header extends Component {
  state = {};

  removeField = () => {
    if (this.state.submitted) {
      this.setState({ form: null });
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
        {this.props.form}
      </nav>
    );
  }
}

export default Header;
