const User = require('../models/user.model');
const utils = require('../../utils');

const createUser = async (req, res, next) => {
  try {
    if (await User.findOne({ email: req.xop.email })) {
      req.error = { msg: 'Email exists' };
      return next({});
    }
    const user = new User();
    user.email = req.xop.email;
    user.setPassword(req.xop.password);

    const userSave = await user.save();
    if (!userSave) {
      return next({});
    }

    return res
      .status(201)
      .json(utils.buildResponse(false, 'User created successfully', user.toAuthJSON()));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.xop.email });

    if (!user) {
      req.error = { msg: 'User not found' };
      return next({});
    }

    if (!user.validPassword(req.xop.password)) {
      req.error = { msg: 'Invalid password' };
      return next({});
    }

    res.status(201).json(utils.buildResponse(false, 'User login successfull', user.toAuthJSON()));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
  login
};
