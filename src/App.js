import React , {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time : 20
    }
  }

  startTimer = () => {
    
    let s = setInterval(() => {
      this.setState({
        time : this.state.time - 1 
      })
      if (!this.state.time) clearInterval(s);
    },1000)
    
  }

  formatTime = (time) => {
    return `${Math.floor(time/60)}:${time%60}`
  }
  render() {
    return (
      <div className="timer-container">
        <div class="base-timer">
          <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
           <g class="base-timer__circle">
             <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
           </g>
          </svg>
          <span className = "base-timer__label">
            {this.formatTime(this.state.time)}
          </span>
        </div>
        <button onClick = {this.startTimer}> </button>

      </div>
    )
  }
}

export default App;
