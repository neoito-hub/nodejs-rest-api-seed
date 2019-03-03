const express = require('express');

const router = express.Router();
const quoteRoutes = require('./quote.routes');
const userRoutes = require('./user.routes');

router.use('/api/quotes', quoteRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
