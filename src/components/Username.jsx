import React, { Component } from "react";

class Username extends Component {
  state = {
    value: "",
    search: (
      <input
        className="form-control mr-sm-2"
        placeholder="Submit Username"
        onChange={event => this.setState({ value: event.target.value })}
      />
    )
  };

  getWarning = () => {
    const rightMargin = {
      marginRight: "5px",
      fontSize: "15px"
    };
    if (!this.props.warning) {
      return null;
    } else {
      return (
        <span className="badge badge-danger" style={rightMargin}>
          Username is already in use!
        </span>
      );
    }
  };

  render() {
    return (
      <div className="form-inline">
        {this.getWarning()}
        <input
          className="form-control mr-sm-2"
          placeholder="Submit Username"
          onChange={event => this.setState({ value: event.target.value })}
        />
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="submit"
          onClick={() => {
            this.props.submitUsername(this.state.value);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Username;
