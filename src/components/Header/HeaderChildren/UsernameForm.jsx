/**
 * This is the component that users will use to input their username.
 */

import React, { Component } from "react";

class UsernameForm extends Component {
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
      fontSize: "15px",
      marginBottom: "0px",
      padding: "7px 20px"
    };
    if (this.props.warning) {
      return (
        <div className="alert alert-danger" role="alert" style={rightMargin}>
          Username is already in use!
        </div>
      );
    } else {
      return null;
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

export default UsernameForm;
