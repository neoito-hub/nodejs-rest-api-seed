const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const env = process.env.NODE_ENV || 'dev';
const config = require('./config')[env];

const app = express();

const db = require('./db')(config);

// to get payload in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for logging
app.use(morgan('combined'));

app.listen(config.port, () => {
  const status = `[app status] running | env -> ${config.configName} | port -> ${config.port}`;
  console.log(status);
});

// for 500 range errors
const serverErrorHandler = (err, req, res, next) => {
  if (env === 'dev') {
    res.status(500).send({ error: true, msg: 'Server crashed', data: err });
  } else {
    res.status(500).send({ error: true, msg: 'Unexpected error happened', data: {} });
  }
};
app.use(serverErrorHandler);

module.exports = app;
