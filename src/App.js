//required imports
import React, { Component } from 'react';                                                                         // react 
import './App.css';                                                                                          //  the main css
import Timer from './components/Timer/Timer';                                                             //  timer component
import Buttons from './components/Buttons/Buttons';                                             //  a simple button container
import Modal from './components/Modal/Modal';                                                 //  time changer modal component

import Login from './components/Login/Login';                                                        // login modal component

import { openModal , timeChanger,openLogin } from './Functions/Fmodal';                                         //function for time changer modal
import { resetTimer, stopTimer, Break, startTimer , timeGenerator } from './Functions/Ftimer'           // funtions for timer
import {logout , login , signup , getList ,listAdder} from './Functions/Fapi'
import {listLoad , listGrab , statusHandler} from './Functions/Flist'
//

// App component start
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s : null,
      time: 1500,
      isLogged: 'L',
      timer: 1500,
      file: '/Assets/beat.mp3',
      modalIsOpen: false,
      break: false,
      loginIsOpen: false,
      breakCount: 1,
      list: [],
      Error : ''
    };
    
    //
    // api function
    this.logout = logout.bind(this);
    this.login = login.bind(this);
    this.signup = signup.bind(this);
    this.getList = getList.bind(this);
    this.listAdder = listAdder.bind(this);
    
    //
    // list function
    this.listLoad = listLoad.bind(this);
    this.listGrab = listGrab.bind(this);
    this.statusHandler = statusHandler.bind(this);
    
    //
    // timer function
    this.timeGenerator = timeGenerator.bind(this);
    this.stopTimer = stopTimer.bind(this);
    this.startTimer = startTimer.bind(this);
    this.break = Break.bind(this);
    this.resetTimer = resetTimer.bind(this);

    //
    //time changer modal function
    this.timeChanger = timeChanger.bind(this);
    this.openModal = openModal.bind(this);

    //
    // login Modal
    this.openLogin = openLogin.bind(this);
    
    this.audio = new Audio(this.state.file);
  }
  componentDidMount = () => {
    if (this.state.isLogged === 'N') {
      if (window.localStorage.getItem('token')) {
        this.getList();
      }
    }
  };
  
  genError = (l) =>{
    this.setState({
      isLogged: 'E',
      Error: l
    });
  }
  
  
 singnupMain =  (username,password,e) =>  {
  if (this.state.isLogged === 'N') {
    this.signup(username, password, this.getList,this.genError);
  }
  e.preventDefault();
}
 
  
  
  loginMain = (username, password, e) => {
    if (this.state.isLogged === 'N') {
      this.login(username, password, this.getList,this.genError);
    }
    e.preventDefault();
  };

  
  //buttons handler
  buttons = () => {
    if (this.state.s) {
      return <Buttons pause={this.stopTimer} reset={this.resetTimer} />;
    } else {
      return <Buttons start={this.startTimer} />;
    }
  };
  
  //render function for rendering duhh
  render() {
    let x = this.timeGenerator();
    let y = this.listGrab()[0].task;
    y = y.length > 15 ? y.slice(0, 15) + '..' : y;
    return (
      <React.Fragment>
        <div
          className={
            this.state.modalIsOpen || this.state.loginIsOpen ? 'overlay' : ''
          }
        ></div>
        <div className="container">
          <div className="timer-container">
            <Timer
              time={x}
              changeTime={this.openModal}
              timer={[this.state.timer, this.state.time]}
              task={y}
            />

            {this.buttons()}
          </div>
          {this.listLoad()}
        </div>
        <Modal
          time={this.state.time}
          submitHandler={this.timeChanger}
          isOpen={this.state.modalIsOpen}
          closer={this.openModal}
        />
        <Login
          logged={this.state.isLogged}
          isOpen={this.state.loginIsOpen}
          closer={this.openLogin}
          loginHandler={this.loginMain}
          signupHandler={this.singnupMain} 
        />
      </React.Fragment>
    );
  }
}
// exporting for index.js
export default App;
