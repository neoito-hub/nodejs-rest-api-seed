const express = require('express');

const router = express.Router();
const quoteRoutes = require('./auth/routes/quote.routes');
const userRoutes = require('./auth/routes/user.routes');

router.use('/api/quotes', quoteRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
