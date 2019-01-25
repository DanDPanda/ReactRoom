import React, { Component } from "react";

class User extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div>
        <li className="list-group-item">{user.name}</li>
      </div>
    );
  }
}

export default User;
