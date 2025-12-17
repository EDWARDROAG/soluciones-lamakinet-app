const express = require('express');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(express.json());
app.use('/api/health', healthRoutes);

const authRoutes = require('./routes/auth/auth.routes');

app.use('/api/auth', authRoutes);

module.exports = app;