const Route = require('express').Router();
const db = require('../db/db');
const r = {
  r: 'hello',
  t: 'hi',
};

Route.route('/').get((req, res) => {
  let coll = db.get().db('todoapp').collection('todolist');
  coll.find({ username: req.decode.username }).toArray((err, doc) => {
    if (err) {
      res.json({ status: 500, message: 'server error' });
    } else {
      res.json(doc);
    }
  });
});

module.exports = Route;
