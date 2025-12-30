const express = require('express');
require('dotenv').config();

const app = express();

app.use('/webhooks/stripe', require('./routes/webhook.routes'));
app.use(express.json());

app.use('/protected', require('./routes/protected.rotues'));

app.use('/auth', require('./routes/auth.routes'));


app.use('/billing', require('./routes/billing.routes'));

app.use('/pro', require('./routes/pro.routes'));



module.exports = app;