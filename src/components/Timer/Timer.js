import React from 'react';
function calc(x) {
  return ((x[1] - x[0]) / x[1]) * 109.9;
}
function Timer(props) {
  return (
    <div className="circle">
      <div className="base-timer">
        <svg viewBox="0 0 36 36">
          <path
            className="base-timer__path-remaining"
            d="M18 0.5
            a 17.5 17.5 0 0 1 0 35
            a 17.5 17.5 0 0 1 0 -35"
            fill="none"
            stroke="#EB165C"
            strokeWidth="0.5"
            strokeDasharray={`${calc(props.timer)},109.9`}
          />
        </svg>
        <p className="base-timer__label">
          <span className="time" onClick={props.changeTime}>
            {props.time}
          </span>

          <span className="task"> {props.task}</span>
        </p>
      </div>
    </div>
  );
}

export default Timer;
