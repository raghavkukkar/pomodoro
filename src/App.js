import React , {Component} from 'react';
import './App.css';
import Timer from './components/Timer/Timer'
let s = null
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time : 20
    }
  }

  startTimer = () => {
    if (!this.state.time) alert("reset it");
    else {
      s = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        })
        if (!this.state.time) this.stopTimer();
      }, 1000)
    
    }
  }
  stopTimer = () => {
    clearInterval(s)
  }
  formatTime = (time) => {
    return `${Math.floor(time/60)}:${time%60}`
  }
  resetTimer = () => {
    clearInterval(s)
    this.setState({
      time : 20
    })
  }
  render() {
    return (
      <div className="timer-container">
        <Timer time={`${Math.floor(this.state.time / 60)}:${this.state.time % 60}`} />
        <div className="button-container">
          <button onClick={this.startTimer}> start</button>
          <button onClick={this.stopTimer}> pause</button>
          <button onClick={this.resetTimer}> reset</button>
        </div>
      </div>
    )
  }
}

export default App;
