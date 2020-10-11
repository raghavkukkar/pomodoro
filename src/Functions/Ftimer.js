function timeGenerator  ()  {
    let x = Math.floor(this.state.timer / 60);
    let y = parseInt(this.state.timer % 60);
    let c = x < 10 ? `0${x}` : `${x}`;
    let d = y < 10 ? `0${y}` : `${y}`;
    return `${c}:${d}`;
}
  
function stopTimer() {
    clearInterval(this.state.s);
    this.setState({ s: null });
    
}
  
function resetTimer(){
    this.stopTimer();
    this.setState({
      timer: this.state.time,
    });
}
  
function Break(){
    let x = !(this.state.breakCount % 4) ? 1800 : 300;
    this.setState({
      time: x,
      timer: x,
      breakCount: this.state.breakCount + 1,
      break: !this.state.break,
    });
    this.startTimer();
}
  
function startTimer  ()  {
    if (!this.state.timer) {
      alert('reset it');
    } else {
      //starts
      if (!this.state.s) {
        let x = Date.now();

        this.state.s = setInterval(() => {
          let d;
          let c;
          if (
            (c = this.state.time - this.state.timer) <
            (d = parseInt((Date.now() - x) / 1000))
          ) {
            this.setState({
              timer: parseInt(this.state.timer - (d - c)),
            });
          } else {
            this.setState({
              timer: this.state.timer - 1,
            });
          }

          //timer stopping with popups
          if (!this.state.timer) {
            this.stopTimer();

            this.audio.play();
            if (!this.state.break) {
              if (window.confirm('start the break')) {
                this.break();
              }
            } else {
              if (window.confirm('reset the pomodoro')) {
                this.setState({
                  time: 1500,
                  timer: 1500,
                  break: !this.state.break,
                });
              }
            }
          }
        }, 1000);
      }
    }
  }
   
  export {stopTimer , startTimer , Break , resetTimer , timeGenerator}