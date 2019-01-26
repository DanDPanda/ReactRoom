import React, { Component } from "react";

class Header extends Component {
  state = {
    value: ""
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <p
          className="navbar-brand"
          style={{ color: "white", paddingBottom: "0" }}
        >
          Game Room
        </p>
        <div className="form-inline">
          <input
            className="form-control mr-sm-2"
            placeholder="Submit Username"
            onChange={event => this.setState({ value: event.target.value })}
          />
          <button
            className="btn btn-outline-info my-2 my-sm-0"
            type="submit"
            onClick={() => this.props.submitUsername(this.state.value)}
          >
            Submit
          </button>
        </div>
      </nav>
    );
  }
}

export default Header;
