import React, { Component } from 'react';
import Buttons from '../Buttons/Buttons';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      signup: false,
    };
    this.logged = <div></div>;
  }
  loginview = () => {
    return (
      <div className="loginview">
        <form>
          <label htmlFor="lusername"></label>
          <input id="lusername" type="text" placeholder="username"></input>
          <label htmlFor="lpassword"></label>
          <input id="lpassword" type="password" placeholder="password"></input>
          <label
            htmlFor="lnickname"
            className={this.state.signup ? '' : 'disabled'}
          ></label>
          <input
            id="lnickname"
            type="text"
            className={this.state.signup ? '' : 'disabled'}
            placeholder="nickname"
          ></input>
        </form>
      </div>
    );
  };
  info = () => {
    return (
      <div className="info">
        <form>
          <label htmlFor="username"></label>
          <input type="text" id="username" disabled={this.state.edit}></input>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            disabled={this.state.edit}
          ></input>
          <label htmlFor="nickname"></label>
          <input type="text" id="nickname" disabled={this.state.edit}></input>
        </form>
      </div>
    );
  };
  buttons = () => {
    if (this.state.signup) {
      return <Buttons SignUp={null} />;
    } else {
      return <Buttons SignIn={null} />;
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
        {this.props.logged ? this.info() : this.loginview()}
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
