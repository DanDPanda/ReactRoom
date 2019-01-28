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

  render() {
    return this.state.users.map(user => (
      <ul className="list-group">
        <User key={user.username} user={user.username} />
      </ul>
    ));
  }
}

export default Users;
