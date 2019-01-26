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

  getWarningStyle = () => {
    if (!this.props.warning) {
      return (
        <input
          className="form-control mr-sm-2"
          placeholder="Submit Username"
          onChange={event => this.setState({ value: event.target.value })}
        />
      );
    } else {
      return (
        <input
          // col-sm-2 col-form-label text-danger
          className="form-control mr-sm-2 text-danger col-form-label"
          placeholder="Submit Username"
          onChange={event => this.setState({ value: event.target.value })}
        />
      );
    }
  };

  render() {
    return (
      <div className="form-inline">
        {this.getWarningStyle()}
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
