import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: false,
    };
  }
  render() {
    return (
      <div className="nav">
        <span> Timers</span>
      </div>
    );
  }
}

export default Nav;
