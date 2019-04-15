import React, { Component } from "react";

class Buttons extends Component {
  getButtons = () => {
    const listStyle = {
      marginTop: "5px",
      marginBottom: "5px",
      textAlign: "center"
    };
    const rightButton = {
      marginLeft: "2.5px"
    };
    const leftButton = {
      marginRight: "2.5px"
    };
    if (this.props.inProgress && this.props.username) {
      return (
        <div style={listStyle}>
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            onClick={() => {
              this.props.socket.emit("end-game", { test: "Test" });
            }}
          >
            End Game
          </button>
        </div>
      );
    } else if (this.props.inProgress === false && this.props.username) {
      return (
        <div style={listStyle}>
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            style={leftButton}
            onClick={() => {
              this.props.socket.emit("start-mafia", { test: "Test" });
            }}
          >
            Mafia
          </button>
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            style={rightButton}
            onClick={() => {
              this.props.socket.emit("start-spyfall", { test: "Test" });
            }}
          >
            Spyfall
          </button>
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    return this.getButtons();
  }
}

export default Buttons;
