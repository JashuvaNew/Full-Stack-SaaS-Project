const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { chat } = require('../controllers/ai.controller');
const aiLimitMiddleware = require('../middleware/ailimit.middleware');

router.post('/chat', authMiddleware, aiLimitMiddleware, chat);

module.exports = router;
