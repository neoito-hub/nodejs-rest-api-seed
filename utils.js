const buildResponse = (error, msg = '', data = {}) => {
  return {
    error,
    msg,
    data
  };
};

const getJWT = req => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
};

module.exports = {
  buildResponse,
  getJWT
};
