const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { User } = require('../../models');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'role'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('❌ /auth/me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;