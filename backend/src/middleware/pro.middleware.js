module.exports = (req, res, next) => {
  // req.user is set by auth middleware
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.user.role !== 'PRO') {
    return res.status(403).json({
      message: 'Upgrade to PRO to access this feature',
    });
  }

  next();
};