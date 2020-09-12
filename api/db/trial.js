const db = require('./db');

exports.getauth = function getauth(user, pass, callback) {
  let data = db.get().db('todoapp');
  let cl = data.collection('users');
  cl.findOne({ username: user, pass: pass })
    .then(function (data) {
      callback(data);
    })
    .catch((err) => callback(err));
};
