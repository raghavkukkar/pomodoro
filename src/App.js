import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Buttons from './components/Buttons/Buttons';
import Modal from './components/Modal/Modal';
import Todo from './components/Todo/Todo';
import Login from './components/Login/Login';
import LoginHandler from './components/LoginHandler/LoginHandler';
let s = null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      isLogged: false,
      timer: 1500,
      file: '/Assets/beat.mp3',
      modalIsOpen: false,
      break: false,
      loginIsOpen: false,
      breakCount: 1,
      list: [],
    };
    this.audio = new Audio(this.state.file);
  }
  //time string generator
  timeGenerator = () => {
    let x = Math.floor(this.state.timer / 60);
    let y = parseInt(this.state.timer % 60);
    let c = x < 10 ? `0${x}` : `${x}`;
    let d = y < 10 ? `0${y}` : `${y}`;
    return `${c}:${d}`;
  };
  //list submit
  listAdder = (x, e) => {
    this.setState({
      list: [...this.state.list, x],
    });
    e.preventDefault();
  };
  //list id checker
  listGrab = () => {
    let x = this.state.list.filter((x) => {
      return x.done === true;
    });
    return x.length ? x : [{ task: '' }];
  };
  //list click handler
  statusHandler = (id) => {
    this.setState({
      list: this.state.list.map((x) => {
        if (x.id === id) {
          x.done = !x.done;
        } else {
          x.done = false;
        }
        return x;
      }),
    });
  };
  //modal submit handler
  timeChanger = (x, e) => {
    this.setState({
      time: x,
      timer: x,
    });
    e.preventDefault();
    this.openModal();
    this.stopTimer();
  };

  //modal opener and closer
  openModal = () => {
    this.stopTimer();
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };

  //stopper function
  stopTimer = () => {
    clearInterval(s);
    s = null;
    this.forceUpdate();
  };

  //timer reseter
  resetTimer = () => {
    this.stopTimer();
    this.setState({
      timer: this.state.time,
    });
  };
  //break manager
  break() {
    let x = !(this.state.breakCount % 4) ? 1800 : 300;
    this.setState({
      time: x,
      timer: x,
      breakCount: this.state.breakCount + 1,
      break: !this.state.break,
    });
    this.startTimer();
  }

  //manage timer
  startTimer = () => {
    if (!this.state.timer) {
      alert('reset it');
      console.log('oye');
    } else {
      //starts
      if (!s) {
        let x = Date.now();

        s = setInterval(() => {
          let d;
          let c;
          if (
            (c = this.state.time - this.state.timer) <
            (d = parseInt((Date.now() - x) / 1000))
          ) {
            this.setState({
              timer: parseInt(this.state.timer - (d - c)),
            });
          } else {
            this.setState({
              timer: this.state.timer - 1,
            });
          }

          //timer stopping with popups
          if (!this.state.timer) {
            this.stopTimer();

            this.audio.play();
            if (!this.state.break) {
              if (window.confirm('start the break')) {
                this.break();
              }
            } else {
              if (window.confirm('reset the pomodoro')) {
                this.setState({
                  time: 1500,
                  timer: 1500,
                  break: !this.state.break,
                });
              }
            }
          }
        }, 1000);
      }
    }
  };
  //buttons handler
  buttons = () => {
    if (s) {
      return <Buttons pause={this.stopTimer} reset={this.resetTimer} />;
    } else {
      return <Buttons start={this.startTimer} />;
    }
  };
  openLogin = () => {
    this.setState({
      loginIsOpen: !this.state.loginIsOpen,
    });
  };
  //render
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
          {this.state.isLogged ? (
            <Todo
              statusHandler={this.statusHandler}
              list={this.state.list}
              listAdder={this.listAdder}
            />
          ) : (
            <LoginHandler openLogin={this.openLogin} />
          )}
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
        />
      </React.Fragment>
    );
  }
}

export default App;
