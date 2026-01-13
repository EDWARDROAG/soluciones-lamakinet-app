const express = require('express');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth/auth.routes');
const protectedRoutes = require('./routes/protected.routes');
const errorHandler = require('./middlewares/error.middleware');
const clientRoutes = require('./routes/client.routes');


const app = express();

app.set('trust proxy', 1);

// Middleware 
app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    req.headers['content-type'] === 'application/json'
  ) {
    delete req.headers['content-type'];
  }
  next();
});

// JSON parser 
app.use(express.json({ strict: true }));

// ✅ RUTA BASE 
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend activo',
    version: '1.0.0'
  });
});

console.log('clientRoutes:', typeof clientRoutes);
console.log('healthRoutes:', typeof healthRoutes);
console.log('authRoutes:', typeof authRoutes);
console.log('protectedRoutes:', typeof protectedRoutes);

// Rutas existentes 
app.use('/api/clients', clientRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// ❌ Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ❌ Middleware de errores (SIEMPRE el último)
app.use(errorHandler);



module.exports = app;
