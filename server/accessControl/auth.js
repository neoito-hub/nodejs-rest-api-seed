const jwt = require('jsonwebtoken');
const { secret } = require('../../config')[process.env.NODE_ENV];

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    req.error = { msg: 'Token not found' };
    return next({});
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      req.error = { msg: 'Failed to verify token' };
      return next({});
    }

    // if everything good, save to request for use in other routes
    req.token = {};
    req.token.id = decoded.id;
    req.token.email = decoded.email;
    next();
  });
};

module.exports = {
  verifyToken
};
