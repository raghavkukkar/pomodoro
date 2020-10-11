import React, { Component } from 'react';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      username: '',
      password: '',
      uverified: false,
    };
  }
  setter = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  verification = (names) => {
    switch (names) {
      case 'password':
        if (
          this.state.password.length !== 0 &&
          this.state.password.length < 8
        ) {
          return (
            <span style={{ color: 'red' }}> enter atleast 8 characters</span>
          );
        }
        return null;

      case 'username':
        if (
          this.state.username.length !== 0 &&
          this.state.username.length < 8
        ) {
          return (
            <span style={{ color: 'red' }}> enter atleast 8 characters</span>
          );
        }
        return null;
      default:
        break;
    }
  };
  loginview = () => {
    return (
      <div className="loginview">
        <form>
          <label htmlFor="username"></label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.setter}
          ></input>
          {this.verification('username')}
          <label htmlFor="password"></label>
          <input
            className={this.props.logged}
            name="password"
            id="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.setter}
          ></input>
          {this.verification('password')}
        </form>
      </div>
    );
  };
  buttons = () => {
    if (this.state.signup) {
      return (
        <button
          onClick = {this.props.signupHandler.bind(this,this.state.username,this.state.password)}
          disabled={
            this.state.username.length < 8 || this.state.password.length < 8
          }
        >
          {' '}
          signup
        </button>
      );
    } else {
      return (
        <button onClick = {this.props.loginHandler.bind(this,this.state.username,this.state.password)}
          disabled={
            this.state.username.length < 8 || this.state.password.length < 8
          }
        >
          signin
        </button>
      );
    }
  };
  signupHandler = () => {
    this.setState({
      signup: !this.state.signup,
    });
  };
  render() {
    return (
      <div className={this.props.isOpen ? 'modal down2' : 'modal'}>
        <i className="closer material-icons" onClick={this.props.closer}>
          close
        </i>
        <span>{this.state.signup ? 'Sign Up' : 'Sign In'}</span>
        {this.loginview()}
        {this.buttons()}
        <span
          style={{ color: 'grey', cursor: 'pointer' }}
          onClick={this.signupHandler}
        >
          {this.state.signup ? null : "Don't have an account?"}
        </span>
      </div>
    );
  }
}

export default Login;
