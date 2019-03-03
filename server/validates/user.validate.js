const joi = require('joi');

const createUser = (req, res, next) => {
  const schema = {
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    req.error = {
      msg: ''
    };
    switch (error.details[0].context.key) {
      case 'email':
        req.error.msg = 'email is invalid';
        break;
      case 'password':
        req.error.msg = 'Password should be a string';
        break;
      default:
        req.error.msg = 'Unknown client error';
    }
    next({});
  } else {
    req.xop = {
      email: value.email,
      password: value.password
    };
  }
  next();
};

const login = (req, res, next) => {
  const schema = {
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    req.error = {
      msg: ''
    };
    switch (error.details[0].context.key) {
      case 'email':
        req.error.msg = 'email is invalid';
        break;
      case 'password':
        req.error.msg = 'Password should be a string';
        break;
      default:
        req.error.msg = 'Unknown client error';
    }
    next({});
  } else {
    req.xop = {
      email: value.email,
      password: value.password
    };
  }
  next();
};

module.exports = {
  createUser,
  login
};
