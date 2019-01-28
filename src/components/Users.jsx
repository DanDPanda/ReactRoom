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

  getProgress = () => {
    if (this.props.inProgress) {
      return <p>YOU ARE {this.props.role}</p>;
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
