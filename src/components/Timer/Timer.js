import React from 'react';

function Timer(props) {
    return (
        <div className="timer">
        <div class="base-timer">
          <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
           <g class="base-timer__circle">
             <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
           </g>
          </svg>
          <span className = "base-timer__label">
            {props.time}
          </span>
            </div>
            </div>
    );
}

export default Timer