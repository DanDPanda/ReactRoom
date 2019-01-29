import React, { Component } from "react";

class Role extends Component {
  getRole = () => {
    const roleStyle = {
      textAlign: "center",
      marginTop: "100px",
      marginBottom: "100px"
    };
    if (this.props.role == null) {
      return (
        <p className="display-1" style={roleStyle}>
          Game is in session.
        </p>
      );
    } else {
      return (
        <p className="display-1" style={roleStyle}>
          You are: {this.props.role}
        </p>
      );
    }
  };

  render() {
    return this.getRole();
  }
}

export default Role;
