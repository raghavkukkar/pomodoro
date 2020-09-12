import React, { Component } from 'react';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskAdder: 'add new task',
    };
  }
  handlevent = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let x = this.props.list.map((x) => {
      return (
        <li
          className={x.done ? 'do' : ''}
          key={x.id}
          onClick={this.props.statusHandler.bind(this, x.id)}
        >
          <span> {x.task} </span>
          <i className="tiny material-icons" style={{ float: 'right' }}>
            delete
          </i>
        </li>
      );
    });
    x.push(
      <li key={0}>
        <form>
          <input
            type="text"
            id="adder"
            name="taskAdder"
            value={this.state.taskAdder}
            onChange={this.handlevent}
          ></input>
          <label
            htmlFor="adder"
            onClick={this.props.listAdder.bind(this, {
              id: x.length + 1,
              task: this.state.taskAdder,
              done: false,
            })}
          >
            <i className="material-icons"> add</i>
          </label>
        </form>
      </li>
    );
    return (
      <div className="todo">
        <h2>
          {' '}
          <i
            className="material-icons"
            style={{ fontSize: '45px', marginRight: '12px' }}
          >
            {' '}
            list
          </i>
          YOUR TASKS!
        </h2>
        <ul>{x}</ul>
      </div>
    );
  }
}
export default Todo;
