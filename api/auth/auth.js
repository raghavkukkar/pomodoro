const jwt = require('jsonwebtoken');
const db = require('../db/db');
const secret = 'iamadeveloper';
const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, secret, (err, done) => {
        if (err) {
          res.json({ status: 501, message: 'not authorized token not valid' });
        } else {
          req.decode = done;
          next();
        }
      });
    } else {
      res.json({ status: 501, message: 'not authorized' });
    }
  } else {
    res.json({ status: 501, message: 'not authorized' });
  }
};

const loginHandler = (req, res, next) => {
  let username = req.body.username;
  let pass = req.body.pass;
  console.log(username, pass);
  if (!username || !pass) {
    res.json({ message: 'for real' });
  } else {
    db.getauth(username, pass, (data) => {
      if (typeof data != Error) {
        if (data) {
          let token = jwt.sign({ id: username }, secret, { expiresIn: 200 });
          res.json({ status: 200, message: { token: token } });
        } else {
          res.json({ status: 401, message: 'wrong username password pair' });
        }
      } else {
        res
          .status(500)
          .json({ status: 500, message: ' sorry server error try again' });
      }
    });
  }
};

module.exports = {
  checkToken: checkToken,
  loginHandler: loginHandler,
};
