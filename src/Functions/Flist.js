import React from 'react'
import LoginHandler from '../components/LoginHandler/LoginHandler';                                    // the login modal opener
import Loader from '../components/Loader/Loader';                                                       //  the waiting loader
import Errors from '../components/Errors/Errors';                                             //  a Simple error gen component
import Todo from '../components/Todo/Todo';                                                        //  the todo list component
function listGrab() {
    let x = this.state.list.filter((x) => {
      return x.done === true;
    });
    return x.length ? x : [{ task: '' }];
  }

  function statusHandler  (id)  {
    this.setState({
      list: this.state.list.map((x) => {
        if (x.id === id) {
          x.done = !x.done;
        } else {
          x.done = false;
        }
        return x;
      }),
    });
  }

  function listLoad  ()  {
    switch (this.state.isLogged) {
      case 'Y':
        return (
          <Todo
            statusHandler={this.statusHandler}
            list={this.state.list}
            listAdder={this.listAdder}
          />
        );
      case 'N':
        return <LoginHandler openLogin={this.openLogin}/>;
      case 'L':
        return <Loader />;
      case 'E':
        return <Errors text = {this.state.Error} />;

      default:
        break;
    }
}
  
export {listLoad , listGrab , statusHandler}