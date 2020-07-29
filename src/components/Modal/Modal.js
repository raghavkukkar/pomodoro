import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time : `${this.props.time}`
        }
    }
    handleIt = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (<div className="modal">
            <form onSubmit = {this.props.submitHandler.bind(this,this.state.time)}>
                <label htmlFor="time"> Enter Time </label>
                <input name="time" type="text" value={`${this.state.time}`} onChange = {this.handleIt} ></input>
                <input type="submit" />
            </form>
        </div>);
    }
}
export default Modal