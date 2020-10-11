function signup(username, password, callback, Err) {
    this.setState({ isLogged: 'L',loginIsOpen:false });
    fetch('http://localhost:5000/sign', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (!res.ok || res.status !== 200) throw new Error('http error');
        console.log('donee');
       return res.json();
      })
      .then((res) => {
        window.localStorage.setItem('token', res.token);
        callback();
      }).catch(e => Err(e.message));
};
  
function logout ()  {
    if (window.localStorage.getItem('token')) {
      window.localStorage.removeItem('token');
      this.setState({ isLogged: 'N',list : [] });
    }
  };
  
function login  (username, password, callback,Err)  {
    this.setState({ isLogged: 'L',loginIsOpen : false });
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (!res.ok || res.status !== 200)
          throw new Error('Some shit happened sorry , pls try again.');
        console.log('llll');
       return res.json();
        
      })
      .then( (res) => {
          if (res.status === 200) {
            window.localStorage.setItem('token', res.message.token);
            callback();
          } else {
            throw Error(res.message)
          }
        })
      .catch((e) => {
        Err(e.message)
      });
};
  
function getList(){
    let c;
    if ((c = window.localStorage.getItem('token'))) {
      fetch('http://localhost:5000/lists', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${c}`,
          'Content-Type': 'application/json'
        },
      })
        .then((res) => {
          if (!res.ok || res.status !== 200)
            throw new Error(
              'hey something happened, you should probably try again'
            );
          res.json();
        })
        .then((res) => {
          if (res.status !== 501 && res.status !== 500) {
            this.setState({
              list: [...this.state.list, res.list],
              isLogged: 'Y',
            });
          } else {
            throw new Error(res.message)
          }
        })
        
    }
  };
  function listAdder (x, e)  {
    let c;
    if ((c = window.localStorage.getItem('token'))) {
      fetch('http://localhost:5000/lists', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${c}`,
        },
        body: JSON.stringify({ list: [...this.state.list, x] }),
      })
        .then((res) => {
          if (!res.ok || res.status !== 200) throw new Error('http error');
          res.json();
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              list: [...this.state.list, x],
            });
          }
        });

      e.preventDefault();
    }
  }
  export {signup,login,getList,logout, listAdder}