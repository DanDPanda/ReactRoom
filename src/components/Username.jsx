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

  getInput = () => {
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
          className="form-control mr-sm-2"
          style={this.warningStyle()}
          placeholder="Submit Username"
          onChange={event => this.setState({ value: event.target.value })}
        />
      );
    }
  };

  getButton = () => {
    if (!this.props.warning) {
      return (
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="submit"
          onClick={() => {
            this.props.submitUsername(this.state.value);
          }}
        >
          Submit
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          type="submit"
          style={this.warningStyle()}
          onClick={() => {
            this.props.submitUsername(this.state.value);
          }}
        >
          Submit
        </button>
      );
    }
  };

  warningStyle = () => {
    return {
      color: "red",
      borderColor: "red"
    };
  };

  render() {
    return (
      <div className="form-inline">
        {this.getInput()}
        {this.getButton()}
      </div>
    );
  }
}

export default Username;
