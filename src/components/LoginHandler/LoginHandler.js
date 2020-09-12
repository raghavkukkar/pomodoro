import React from 'react';
function LoginHandler(props) {
  return (
    <div className="loginTrigger">
      <h2>LOGIN AND START ADDING YOUR TAKS</h2>
      <h3>Start adding Task, Pick your lazy ASS and work</h3>
      <button onClick={props.openLogin}>LOG IN</button>
    </div>
  );
}
export default LoginHandler;
