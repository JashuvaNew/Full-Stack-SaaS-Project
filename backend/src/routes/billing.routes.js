const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const billingController = require('../controllers/billing.controller');

router.post('/checkout', authMiddleware, billingController.createCheckoutSession);

module.exports = router;
