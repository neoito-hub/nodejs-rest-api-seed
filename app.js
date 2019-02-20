const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const env = process.env.NODE_ENV || 'dev';
const config = require('./config')[env];

const app = express();

// to get payload in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for logging
app.use(morgan('combined'));

app.listen(config.port, () => {
  const status = `[app] running | env -> ${config.configName} | port -> ${config.port}`;
  console.log(status);
});
