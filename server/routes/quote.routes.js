const express = require('express');

const router = express.Router();
const quoteController = require('../controllers/quote.controller');

router.route('/').post(quoteController.addQuote);
router.route('/').put(quoteController.updateQuote);
router.route('/').delete(quoteController.deleteQuote);
router.route('/').get(quoteController.getQuotes);

module.exports = router;
