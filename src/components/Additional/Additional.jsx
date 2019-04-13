/**
 * This component displays the additional information based on the game.
 * Mafia and no game displays the players
 * Spyfall displays the location on the map.
 */

import React, { Component } from "react";

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
    const locationStyle = {
      marginTop: "5px"
    };
    const userStyle = {
      marginTop: "5px"
    };
    if (
      this.props.game === "Mafia" &&
      this.props.inProgress &&
      this.props.role != null
    ) {
      // If the game is mafia, return the list of users
      return this.props.additional.map(user => (
        <ul key={user.username} className="list-group" style={listStyle}>
          <li className="list-group-item" style={userStyle}>
            {user.username}
          </li>
        </ul>
      ));
    } else if (
      this.props.game === "Spyfall" &&
      this.props.inProgress &&
      this.props.role != null
    ) {
      // If the game is spyfall, return the list of locations and the player's role
      return (
        <div>
          {this.getSpy()}
          {this.props.additional.locations.map(location => (
            <ul key={location} className="list-group" style={listStyle}>
              <li className="list-group-item" style={locationStyle}>
                {location}
              </li>
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
