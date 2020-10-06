const Route = require('express').Router();
const db = require('../db/db');
const r = {
  r: 'hello',
  t: 'hi',
};

Route.route('/')
  .get((req, res) => {
    let coll = db.get().db('todoapp').collection('todolist');
    console.log(req.decode.id);
    coll.find({ username: req.decode.id }).toArray((err, doc) => {
      if (err) {
        res.json({ status: 500, message: 'server error' });
      } else {
        console.log(doc);
        res.json(doc);
      }
    });
  })
  .post((req, res) => {
    const list = req.body.list;
    let coll = db.get().db('todoapp').collection('todolist');
    coll
      .updateOne(
        { username: req.decode.id },
        { $set: { list: list } },
        { upsert: false }
      )
      .then((data) => {
        res.status(200);
        res.json({ message: 'please update' });
      })
      .catch((err) => res.json({ message: 'shitshow here' }));
  });

module.exports = Route;
