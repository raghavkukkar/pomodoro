import React , {Component} from 'react';
import './App.css';
import Timer from './components/Timer/Timer'
import Buttons from './components/Buttons/Buttons'
import Modal from './components/Modal/Modal'
let s = null
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
      timer : 10,
      file: "/Assets/beat.mp3",
      modalIsOpen : false
    }
  }
  timeChanger = (x,e) => {  
    this.setState({
      time: x,
      timer : x
    })
    e.preventDefault();
  }
  openModal = () => {
    this.setState({
      modalIsOpen : !this.state.modalIsOpen
    })
  }

  playAudio = (file) =>{
    let audio = new Audio(file);
    audio.play();
  }

  startTimer = () => {
    if (!this.state.time) alert("reset it");
    else {
      s = setInterval(() => {
        this.setState({
          timer: this.state.timer - 1
        })
        if (!this.state.timer) {
          this.stopTimer();
          this.playAudio(this.state.file);
        }
      }, 1000)
    
    }
  }

  stopTimer = () => {
    clearInterval(s)
  }


  resetTimer = () => {
    clearInterval(s)
    this.setState({
      timer : this.state.time
    })
  }

  render() {
    return (
      <React.Fragment>
      <div className="timer-container">
        <Timer time={`${Math.floor(this.state.timer / 60)}:${this.state.timer % 60}`} />
        <Buttons startTimer={this.startTimer} stopTimer={this.stopTimer} resetTimer={this.resetTimer} changeTime={this.openModal} />
        
        </div>
        {this.state.modalIsOpen ? <Modal time={30} submitHandler={this.timeChanger} />:<React.Fragment></React.Fragment>}
      </React.Fragment>
    )
  }
}

export default App;
