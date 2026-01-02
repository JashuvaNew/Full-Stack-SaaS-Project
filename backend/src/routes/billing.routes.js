const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const {createCheckoutSession} = require('../controllers/billing.controller');

router.post('/checkout', authMiddleware, createCheckoutSession);

module.exports = router;
