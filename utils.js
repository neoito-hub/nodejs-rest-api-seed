const buildResponse = (error, msg = '', data = {}) => {
  return {
    error,
    msg,
    data
  };
};

// for 400 range errors
const clientErrorHandler = (req, res, next) => {
  if (req.xhrValidate) {
    return res.status(400).json(buildResponse(true, req.xhrValidate.msg, {}));
  }
  return next();
};

module.exports = {
  buildResponse,
  clientErrorHandler
};
