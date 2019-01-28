import React, { Component } from "react";

class Username extends Component {
  state = {};
  render() {
    const usernameStyle = {
      cursor: "auto",
      backgroundColor: "#17a2b8",
      color: "white",
      borderRadius: "0.25rem"
    };
    return (
      <div className="form-inline" style={usernameStyle}>
        <p style={usernameStyle} className="btn btn-outline-info my-2 my-sm-0">
          Username: {this.props.username}
        </p>
      </div>
    );
  }
}
export default Username;
