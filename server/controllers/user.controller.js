const User = require('../models/user.model');
const utils = require('../../utils');

const createUser = async (req, res, next) => {
  try {
    const user = new User();
    user.email = req.xop.email;
    user.setPassword(req.xop.password);

    const userSave = await user.save();
    if (!userSave) {
      next({});
    }

    res.status(201).json(utils.buildResponse(false, 'User created successfully', {}));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  createUser
};
