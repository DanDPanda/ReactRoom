import React, { Component } from "react";

class Buttons extends Component {
  getButtons = () => {
    const listStyle = {
      marginTop: "10px",
      textAlign: "center"
    };
    const rightButton = {
      marginLeft: "5px"
    };
    const leftButton = {
      marginRight: "5px"
    };
    if (this.props.inProgress) {
      return (
        <div style={listStyle}>
          <button className="btn btn-outline-info my-2 my-sm-0">
            End Game
          </button>
        </div>
      );
    } else {
      return (
        <div style={listStyle}>
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            style={leftButton}
          >
            Mafia
          </button>
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            style={rightButton}
          >
            Spyfall
          </button>
        </div>
      );
    }
  };
  render() {
    return this.getButtons();
  }
}

export default Buttons;
