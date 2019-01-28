import React, { Component } from "react";
import User from "./User";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.props.socket.on("update-msg", sock => {
      this.setState({ users: sock.clients });
    });

    this.props.socket.emit("get-list");
  }

  //TODO: Change this component name and make a new component for the roles!
  getProgress = () => {
    const roleStyle = {
      textAlign: "center",
      marginTop: "100px"
    };
    if (this.props.inProgress && this.props.role == null) {
      return (
        <p className="display-1" style={roleStyle}>
          Game is in session.
        </p>
      );
    } else if (this.props.inProgress) {
      return (
        <p className="display-1" style={roleStyle}>
          You are: {this.props.role}
        </p>
      );
    } else {
      return this.state.users.map(user => (
        <User key={user.username} user={user.username} />
      ));
    }
  };

  render() {
    return (
      <div>
        <ul className="list-group">{this.getProgress()}</ul>
      </div>
    );
  }
}

export default Users;
