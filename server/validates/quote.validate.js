const joi = require('joi');

const addQuote = (req, res, next) => {
  const schema = {
    quote: joi.string().required(),
    by: joi.string().required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    req.xhrValidate = {
      msg: ''
    };
    switch (error.details[0].context.key) {
      case 'quote':
        req.xhrValidate.msg = 'Quote should be a string :P';
        break;
      case 'by':
        req.xhrValidate.msg = 'By should be a string :P';
        break;
      default:
        req.xhrValidate.msg = 'Unknown client error';
    }
  } else {
    req.xop = {
      quote: value.quote,
      by: value.by
    };
  }
  next();
};

module.exports = {
  addQuote
};
