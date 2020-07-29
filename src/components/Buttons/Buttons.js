import React from 'react';

function Buttons(props) {
    return (
        <div className="button-container">
          <button onClick={props.startTimer}> start</button>
          <button onClick={props.stopTimer}> pause</button>
          <button onClick={props.resetTimer}> reset</button>
          <button onClick={props.changeTime}> change time</button>
        </div>
    );
}

export default Buttons