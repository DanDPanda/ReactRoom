/**
 * This component displays the additional information based on the game.
 * Mafia and no game displays the players
 * Spyfall displays the location on the map.
 */

import React, { Component } from "react";
import User from "../Display/DisplayChildren/UsersChildren/User";
import Locations from "./AdditionalChildren/Locations";

class Additional extends Component {
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
      const roleStyle = {
        textAlign: "center",
        marginTop: "100px",
        marginBottom: "100px"
      };
      return (
        <div>
          <p className="display-1" style={roleStyle}>
            Location:
          </p>
          {this.props.additional.map(location => (
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
    return <p>{this.getProgress()}</p>;
  }
}

export default Additional;
