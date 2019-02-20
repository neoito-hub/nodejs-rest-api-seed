const buildResponse = (error, msg = '', data = {}) => {
  return {
    error,
    msg,
    data
  };
};

// for 400 range errors
const clientErrorHandler = (err, req, res, next) => {
  console.log('mleh');
  if (req.xhr) {
    return res.status(400).json(true, req.xhr.msg, {});
  }
  return next(err);
};

module.exports = {
  buildResponse,
  clientErrorHandler
};
