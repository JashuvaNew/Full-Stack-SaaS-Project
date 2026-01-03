const { AiUsage } = require('../models');

module.exports = async (req, res, next) => {
  const user = req.user;

  if (user.role === 'PRO') return next();

  let usage = await AiUsage.findOne({ where: { userId: user.id } });

  const today = new Date().toDateString();

  if (!usage) {
    usage = await AiUsage.create({
      userId: user.id,
      count: 1,
      lastUsed: new Date(),
    });
    return next();
  }

  if (new Date(usage.lastUsed).toDateString() !== today) {
    usage.count = 1;
    usage.lastUsed = new Date();
    await usage.save();
    return next();
  }

  if (usage.count >= 5) {
    return res.status(403).json({
      message: 'Daily AI limit reached. Upgrade to PRO.',
    });
  }

  usage.count += 1;
  await usage.save();
  next();
};
