const express = require('express');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    req.headers['content-type'] === 'application/json'
  ) {
    delete req.headers['content-type'];
  }
  next();
});


app.use(express.json({
  strict: true
}));
app.use('/api/health', healthRoutes);

const authRoutes = require('./routes/auth/auth.routes');

app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protected.routes');

app.use('/api/protected', protectedRoutes);

module.exports = app;