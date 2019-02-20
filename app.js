const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const env = process.env.NODE_ENV || 'dev';
const config = require('./config')[env];
const utils = require('./utils');

const app = express();

// connecting to mongodb
require('./db')(config);

// to get payload in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for logging
// https://github.com/expressjs/morgan
app.use(morgan(env === 'dev' ? 'dev' : 'common'));

const routes = require('./server/routes/index.routes');

app.use('/', routes);

app.listen(config.port, () => {
  const status = `[app status] running | env -> ${config.configName} | port -> ${config.port}`;
  console.log(status);
});

// for 400 range errors
const clientErrorHandler = (err, req, res, next) => {
  if (req.error) {
    res.status(400).json(utils.buildResponse(true, req.error.msg, {}));
  } else {
    next(err);
  }
};
app.use(clientErrorHandler);

// for 500 range errors
const serverErrorHandler = (err, req, res, next) => {
  if (env === 'dev') {
    res.status(500).json(utils.buildResponse(true, 'Server crashed', err));
  } else {
    res.status(500).json(utils.buildResponse(true, 'Unexpected error happened', {}));
  }
};
app.use(serverErrorHandler);

module.exports = app;
