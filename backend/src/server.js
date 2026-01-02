require('dotenv').config();
const app = require('./app');
const db = require('../models');
const PORT = process.env.PORT || 3000;

// (async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log('Database connected');

//     // ✅ Create tables if they do not exist
//     await db.sequelize.sync({ alter: true });

//     console.log('Database synced');
//   } catch (err) {
//     console.error('Database sync error:', err);
//   }
// })();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
