const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/webhooks/stripe', require('./routes/webhook.routes'));
app.use(express.json());

app.use('/protected', require('./routes/protected.rotues'));

app.use('/auth', require('./routes/auth.routes'));


app.use('/billing', require('./routes/billing.routes'));

app.use('/pro', require('./routes/pro.routes'));



module.exports = app;