import React, { Component } from "react";
import User from "../Display/DisplayChildren/UsersChildren/User";

class Additional extends Component {
  getProgress = () => {
    if (this.props.game === "mafia") {
      return this.props.inProgress
        ? this.props.additional.map(user => (
            <ul key={user.username} className="list-group">
              <User key={user.username} user={user.username} />
            </ul>
          ))
        : null;
    } else {
      return null;
    }
  };

  render() {
    return this.getProgress();
  }
}

export default Additional;
