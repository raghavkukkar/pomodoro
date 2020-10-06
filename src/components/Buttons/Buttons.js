import React from 'react';

function Buttons(props) {
  let y = Object.keys(props).filter((x) => {
    return x !== 'disabled';
  });
  console.log(y);
  let x = Object.values(props)
    .filter((x) => {
      return typeof x != 'boolean';
    })
    .map((o, i) => {
      return (
        <button key={i} onClick={o} disabled={props.disabled}>
          {y[i]}
        </button>
      );
    });

  return <div className="button-container">{x}</div>;
}

export default Buttons;
