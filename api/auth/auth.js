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
          console.log(done);
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
  let password = req.body.password;
  if (!username || !password) {
    console.log(username, password);
    res.json({ message: 'for real' });
  } else {
    db.getauth(username, password, (data) => {
      if (typeof data != Error) {
        if (data) {
          let token = jwt.sign({ id: username }, secret, { expiresIn: 2000 });
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
const signHandler = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400);
    res.json({ message: 'shithole add password' });
  } else {
    if (password.length < 8) {
      res.status(500);
      res.json({
        message:
          'add more characters to your password should be atleast 8 characters long',
      });
      return;
    }
    db.getUser(username, (data) => {
      if (data == typeof Error) {
        res.status(500);
        res.json({ message: 'sorry its a shitshow here' });
      }
      if (!data) {
        db.adduser(username, password, (data) => {
          if (data == typeof Error) {
            res.status(500);
            res.json({ message: 'sorry its a shitshow here' });
          } else {
            db.adduserList(username, (data) => {
              if (data == typeof Error) {
                res.status(500);
                res.json({ message: 'sorry its a shitshow here' });
              } else {
                let token = jwt.sign({ id: username }, secret, {
                  expiresIn: 2000,
                });
                res.status(200);
                res.json({ token: token });
              }
            });
          }
        });
      } else {
        res.json({
          message: 'sorry username not unique a tip just use your email',
        });
      }
    });
  }
};

module.exports = {
  checkToken: checkToken,
  loginHandler: loginHandler,
  signHandler: signHandler,
};
