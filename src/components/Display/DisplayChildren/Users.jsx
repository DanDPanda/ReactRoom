/**
 * Displays all the users online.
 */

import React, { Component } from "react";

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
    const userStyle = {
      marginTop: "5px"
    };
    return this.state.users.map(user => (
      <ul key={user.username} className="list-group" style={listStyle}>
        <li className="list-group-item" style={userStyle}>
          {user.username}
        </li>
      </ul>
    ));
  }
}

export default Users;
