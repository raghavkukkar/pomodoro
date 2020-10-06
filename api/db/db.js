const MongoClient = require('mongodb').MongoClient;
let object = null;
exports.connect = async function (uri, done) {
  object = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await object.connect();
    done();
  } catch (err) {
    return done(err);
  }
};

exports.get = () => {
  return object;
};
exports.getUser = function getauth(user, callback) {
  let data = object.db('todoapp');
  let cl = data.collection('users');
  cl.findOne({ username: user })
    .then(function (data) {
      callback(data);
    })
    .catch((err) => callback(err));
};

exports.getauth = function getauth(user, pass, callback) {
  let data = object.db('todoapp');
  let cl = data.collection('users');
  cl.findOne({ username: user, password: pass })
    .then(function (data) {
      callback(data);
    })
    .catch((err) => callback(err));
};
exports.adduser = function adduser(user, pass, callback) {
  let data = object.db('todoapp');
  let cl = data.collection('users');
  if (pass.length < 8) {
    return new Error('bitch add some characters');
  }
  cl.insertOne({
    username: user,
    password: pass,
  })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      callback(err);
    });
};

exports.adduserList = function adduser(user, callback) {
  let data = object.db('todoapp');
  let cl = data.collection('todolist');
  cl.insertOne({
    username: user,
    list: [],
  })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      callback(err);
    });
};

// var state = {
//   db: null,
// }

// exports.connect = function(url, done) {
//   if (state.db) return done()

//   MongoClient.connect(url, function(err, db) {
//     if (err) return done(err)
//     state.db = db
//     done()
//   })
// }

// exports.get = function() {
//   return state.db
// }

// exports.close = function(done) {
//   if (state.db) {
//     state.db.close(function(err, result) {
//       state.db = null
//       state.mode = null
//       done(err)
//     })
//   }
// }
