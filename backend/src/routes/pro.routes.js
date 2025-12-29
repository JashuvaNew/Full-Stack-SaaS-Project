const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const proMiddleware = require('../middleware/pro.middleware');

router.get('/dashboard', authMiddleware, proMiddleware, (req, res) => {
  res.json({
    message: 'Welcome PRO user',
    user: req.user,
  });
});

module.exports = router;
