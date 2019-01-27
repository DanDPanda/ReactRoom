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

    this.props.socket.on("game-start", sock => {
      this.setState({ users: [] });
    });

    this.props.socket.emit("get-list");
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.state.users.map(user => (
            <User key={user} user={user} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
