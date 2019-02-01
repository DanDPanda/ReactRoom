import React, { Component } from "react";

class Location extends Component {
  state = {};
  render() {
    return <li className="list-group-item">{this.props.location}</li>;
  }
}

export default Location;
