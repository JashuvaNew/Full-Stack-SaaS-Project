const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { User } = require('../../models');
const { ROWLOCK } = require('sequelize/lib/table-hints');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, async (req, res) => {
 
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'role']
  });
  res.json(user);
});


module.exports = router;