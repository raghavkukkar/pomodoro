import React from 'react';

function Buttons(props) {
  let y = Object.keys(props);
  let x = Object.values(props).map((o, i) => {
    return (
      <button key={i} onClick={o}>
        {y[i]}
      </button>
    );
  });

  return <div className="button-container">{x}</div>;
}

export default Buttons;
