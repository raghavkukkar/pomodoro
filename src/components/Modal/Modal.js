import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: `${this.props.time}`,
    };
  }
  handleIt = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <div className={this.props.isOpen ? 'modal down' : 'modal'}>
        <i className="closer material-icons" onClick={this.props.closer}>
          close
        </i>
        <form>
          <label htmlFor="time"> Enter Time </label>
          <input
            name="time"
            type="text"
            value={this.state.time}
            onChange={this.handleIt}
          ></input>
        </form>
        <button onClick={this.props.submitHandler.bind(this, this.state.time)}>
          Submit
        </button>
      </div>
    );
  }
}
export default Modal;
