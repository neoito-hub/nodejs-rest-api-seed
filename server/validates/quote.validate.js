const joi = require('joi');

const addQuote = (req, res, next) => {
  const schema = {
    quote: joi.string().required(),
    by: joi.string().required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    req.error = {
      msg: ''
    };
    switch (error.details[0].context.key) {
      case 'quote':
        req.error.msg = 'Quote should be a string :P';
        break;
      case 'by':
        req.error.msg = 'By should be a string :P';
        break;
      default:
        req.error.msg = 'Unknown client error';
    }
    next({});
  } else {
    req.xop = {
      quote: value.quote,
      by: value.by
    };
  }
  next();
};

const getQuotes = (req, res, next) => {
  const schema = {
    p: joi.number()
  };

  const { error, value } = joi.validate(req.query, schema);

  if (error) {
    req.error = {
      msg: ''
    };
    switch (error.details[0].context.key) {
      case 'p':
        req.error.msg = 'Page number should be a number';
        break;
      default:
        req.error.msg = 'Unknown client error';
    }
    next({});
  } else {
    req.xop = {
      p: value.p
    };
  }
  next();
};

module.exports = {
  addQuote,
  getQuotes
};
