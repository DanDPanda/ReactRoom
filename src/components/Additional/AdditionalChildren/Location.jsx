/**
 * This is how each location will be displayed.
 */

import React, { Component } from "react";

class Location extends Component {
  render() {
    const locationStyle = {
      marginTop: "5px"
    };
    return (
      <li className="list-group-item" style={locationStyle}>
        {this.props.location}
      </li>
    );
  }
}

export default Location;
