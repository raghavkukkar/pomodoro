const express = require('express');
const routes = require('./routes/route');
const PORT = process.env.PORT || 5000;
const mongo = require('./db/db');
const auth = require('./auth/auth');
const database = mongo.connect;
// const server = require('mongodb').MongoClient;
const app = express();

const uri =
  'mongodb+srv://todoapp:nGRZdln4UXykgOAA@cluster0.xybjf.mongodb.net/todoapp?retryWrites=true&w=majority';

const con = database(uri, (err) => {
  if (err) {
    return err;
  } else {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('connected');
    });
  }
});

const createError = (err) => {
  switch (err) {
    case 404:
      return { response: 'error', code: '404', message: 'not found' };

    default:
      break;
  }
};
app.use(express.json());

app.use('/login', auth.loginHandler);
app.use('/', auth.checkToken, routes);
app.use((req, res, next) => {
  res.statusCode = 404;
  res.json(createError(404));
});
