function openModal() {
    this.stopTimer();
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
}
function timeChanger(x, e) {
    this.setState({
      time: x,
      timer: x,
    });
    e.preventDefault();
    this.openModal();
    this.stopTimer();
  }
  function openLogin  ()  {
    this.setState({
      loginIsOpen: !this.state.loginIsOpen,
    });
  }
  
export { openModal, timeChanger, openLogin };