const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware, (req, res) => {
   res.json({
    message:'Access granted to protected profile route',
    user: req.user
   })
});

module.exports = router;