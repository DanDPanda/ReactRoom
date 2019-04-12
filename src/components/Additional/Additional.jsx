/**
 * This component displays the additional information based on the game.
 * Mafia and no game displays the players
 * Spyfall displays the location on the map.
 */

import React, { Component } from "react";
import User from "../Display/DisplayChildren/UsersChildren/User";
import Locations from "./AdditionalChildren/Locations";

class Additional extends Component {
  getSpy = () => {
    const roleStyle = {
      textAlign: "center",
      marginBottom: "50px"
    };
    if (this.props.role === "Not Spy") {
      return (
        <p className="display-4" style={roleStyle}>
          Location: {this.props.additional.location}
        </p>
      );
    } else {
      return null;
    }
  };

  getProgress = () => {
    const listStyle = {
      maxWidth: "25%",
      margin: "auto",
      textAlign: "center"
    };
    if (
      this.props.game === "Mafia" &&
      this.props.inProgress &&
      this.props.role != null
    ) {
      return this.props.additional.map(user => (
        <ul key={user.username} className="list-group" style={listStyle}>
          <User key={user.username} user={user.username} />
        </ul>
      ));
    } else if (
      this.props.game === "Spyfall" &&
      this.props.inProgress &&
      this.props.role != null
    ) {
      return (
        <div>
          {this.getSpy()}
          {this.props.additional.locations.map(location => (
            <ul key={location} className="list-group" style={listStyle}>
              <Locations key={location} location={location} />
            </ul>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return this.getProgress();
  }
}

export default Additional;
