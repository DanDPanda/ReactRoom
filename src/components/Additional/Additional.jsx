import React, { Component } from "react";
import User from "../Display/DisplayChildren/UsersChildren/User";
import Location from "./AdditionalChildren/Location";

class Additional extends Component {
  getProgress = () => {
    const listStyle = {
      maxWidth: "25%",
      margin: "auto",
      textAlig: "center"
    };
    if (this.props.game === "Mafia" && this.props.inProgress) {
      return this.props.additional.map(user => (
        <ul key={user.username} className="list-group" style={listStyle}>
          <User key={user.username} user={user.username} />
        </ul>
      ));
    } else if (this.props.game === "Spyfall" && this.props.inProgress) {
      return this.props.additional.map(location => (
        <ul key={location} className="list-group" style={listStyle}>
          <Location key={location} location={location} />
        </ul>
      ));
    } else {
      return null;
    }
  };

  render() {
    return this.getProgress();
  }
}

export default Additional;
