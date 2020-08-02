import React , {Component} from 'react';
import './App.css';
import Timer from './components/Timer/Timer'
import Buttons from './components/Buttons/Buttons'
import Modal from './components/Modal/Modal'
import Nav from './components/Nav/Nav'
let s = null
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
      timer : 10,
      file: "/Assets/beat.mp3",
      modalIsOpen: false,
      break: false,
      breakCount: 1    }
  }

  //modal submit handler
  timeChanger = (x,e) => {  
    this.setState({
      time: x,
      timer: x
    })
    e.preventDefault();
    this.openModal();
  }

  //modal opener and closer
  openModal = () => {
    this.setState({
      modalIsOpen : !this.state.modalIsOpen
    })
  }
  // audio play
  playAudio = (file) =>{
    let audio = new Audio(file);
    audio.play();
  }

//stopper function
  stopTimer = () => {
    clearInterval(s)
  }

  //timer reseter
  resetTimer = () => {
    clearInterval(s)
    this.setState({
      timer : this.state.time
    })
  }
  //break manager
  break() {
   let  x = !(this.state.breakCount % 4) ? 11 : 3;
    this.setState({
      time: x,
      timer: x,
      breakCount: this.state.breakCount + 1,
      break: !this.state.break
    });
    this.startTimer();
  }

  //manage timer
startTimer = () => {
  if (!this.state.time) alert("reset it");
  else {
    s = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1
      })
      if (!this.state.timer) {
        this.stopTimer();
        if (!this.state.break) {
          if (window.confirm("start the break")) {
            this.break();
          }
        }
        else {
          if (window.confirm("reset the pomodoro")) {
            this.setState({
              time: 15,
              timer: 15,
              break : !this.state.break
            })
          }
        }
       
      }
    }, 1000)
  
  }
}
  render() {
    return (
      <React.Fragment>
        <div className={this.state.modalIsOpen ? "overlay" : ""}></div> 
      <Nav/>  
      <div className="timer-container">
        <Timer time={`${Math.floor(this.state.timer / 60)}:${parseInt(this.state.timer % 60)}`} />
        <Buttons startTimer={this.startTimer} stopTimer={this.stopTimer} resetTimer={this.resetTimer} changeTime={this.openModal} />
        
        </div>
        <Modal time={this.state.time} submitHandler={this.timeChanger} isOpen={this.state.modalIsOpen} closer={this.openModal}/>
        </React.Fragment>
    )
  }
}

export default App;
