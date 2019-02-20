const buildResponse = (error, msg = '', data = {}) => {
  return {
    error,
    msg,
    data
  };
};

module.exports = {
  buildResponse
};
