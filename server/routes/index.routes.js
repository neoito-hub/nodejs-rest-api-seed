const express = require('express');

const router = express.Router();
const quoteRoutes = require('./quote.routes');

router.use('/api/quotes', quoteRoutes);

module.exports = router;
