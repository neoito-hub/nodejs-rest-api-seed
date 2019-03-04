const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../validates/user.validate');
const { verifyToken } = require('../../../accessControl/auth');

router
  .route('/')
  .get(verifyToken, userController.me)
  .post(userValidate.createUser, userController.createUser);

router.route('/login').post(userValidate.login, userController.login);

module.exports = router;
