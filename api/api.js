const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/route');
const PORT = process.env.PORT ;
const mongo = require('./db/db');
const auth = require('./auth/auth');
const database = mongo.connect;
dotenv.config({ path: './config/config.env' });
const app = express();

const uri = process.env.URI ;
console.log(PORT);
console.log(uri);

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
app.use(cors());
app.use(express.json());
app.use('/sign', auth.signHandler);
app.use('/login', auth.loginHandler);
app.use('/lists', auth.checkToken, routes);
app.use((req, res, next) => {
  res.statusCode = 404;
  res.json(createError(404));
});
