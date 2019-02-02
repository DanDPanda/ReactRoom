import React, { Component } from "react";
import User from "./UsersChildren/User";

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

  componentWillUnmount() {
    this.props.socket.removeAllListeners("update-msg");
  }

  render() {
    const listStyle = {
      maxWidth: "25%",
      margin: "auto",
      textAlign: "center"
    };
    return this.state.users.map(user => (
      <ul key={user.username} className="list-group" style={listStyle}>
        <User key={user.username} user={user.username} />
      </ul>
    ));
  }
}

export default Users;
