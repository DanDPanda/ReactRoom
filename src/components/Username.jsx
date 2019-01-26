import React, { Component } from "react";

class Username extends Component {
  state = {};
  render() {
    return (
      <div className="form-inline">
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
