import React, { Component } from "react";
import User from "./User";

class Users extends Component {
  state = {};
  render() {
    const { users } = this.props;

    return (
      <div>
        <ul className="list-group">
          {users.map(user => (
            <User key={user} user={user} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
