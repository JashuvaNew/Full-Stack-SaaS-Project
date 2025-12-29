const express = require('express');
const app = express();

app.use(express.json());

app.use('/protected', require('./routes/protected.rotues'));

app.use('/auth', require('./routes/auth.routes'));


module.exports = app;