const express = require('express');

const router = express.Router();
// const utils = require('../../utils');
const quoteController = require('../controllers/quote.controller');
const quoteValidate = require('../validates/quote.validate');

router
  .route('/')
  .post(quoteValidate.addQuote, quoteController.addQuote)
  .put(quoteController.updateQuote)
  .delete(quoteController.deleteQuote)
  .get(quoteController.getQuotes);

module.exports = router;
