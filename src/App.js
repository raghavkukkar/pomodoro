import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import Buttons from './components/Buttons/Buttons';
import Modal from './components/Modal/Modal';
import Todo from './components/Todo/Todo';
import Login from './components/Login/Login';
import LoginHandler from './components/LoginHandler/LoginHandler';
import Loader from './components/Loader/Loader';
import Errors from './components/Errors/Errors';
let s = null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1500,
      isLogged: 'N',
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
  componentDidMount = () => {
    if (this.state.isLogged === 'N') {
    }
  };
  signup = (username, password, callback) => {
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (!res.ok || res.status !== 200) throw new Error('http error');
        res.json();
      })
      .then((res) => localStorage.setItem('token', res.token));
  };
  login = (username, password, callback) => {
    this.setState({ isLogged: 'L' });
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (!res.ok || res.status !== 200)
          throw new Error('Some shit happened sorry , pls try again.');
        res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem('token', res.message.token);
          callback();
        } else {
          //do something
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  getList = () => {
    let c;
    if ((c = window.localStorage.getItem('token'))) {
      fetch('http://localhost:5000/lists', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${c}`,
        },
      })
        .then((res) => {
          if (!res.ok || res.status !== 200)
            throw new Error(
              'hey something happened, you should probably try again'
            );
          res.json();
        })
        .then((res) => {
          if (res.status !== 501 && res.status !== 500) {
            this.setState({
              list: [...this.state.list, res.list],
              isLogged: 'Y',
            });
          } else {
            //do something
          }
        })
        .catch((e) => console.error(e));
    }
  };

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
    let c;
    if ((c = window.localStorage.getItem('token'))) {
      fetch('http://localhost:5000/lists', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${c}`,
        },
        body: JSON.stringify({ list: [...this.state.list, x] }),
      })
        .then((res) => {
          if (!res.ok || res.status !== 200) throw new Error('http error');
          res.json();
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              list: [...this.state.list, x],
            });
          }
        });

      e.preventDefault();
    }
  };
  logout = () => {
    if (window.localStorage.getItem('token')) {
      window.localStorage.removeItem('token');
      this.setState({ isLogged: 'N' });
    }
  };
  //login main function
  loginMain = (username, password, e) => {
    if (this.state.isLogged === 'N') {
      this.login(username, password, this.getList());
    }
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
  //loader and login
  listLoad = () => {
    switch (this.state.isLogged) {
      case 'Y':
        return (
          <Todo
            statusHandler={this.statusHandler}
            list={this.state.list}
            listAdder={this.listAdder}
          />
        );
      case 'N':
        return <LoginHandler openLogin={this.openLogin} />;
      case 'L':
        return <Loader />;
      case 'E':
        return <Errors />;

      default:
        break;
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
        />
      </React.Fragment>
    );
  }
}

export default App;
