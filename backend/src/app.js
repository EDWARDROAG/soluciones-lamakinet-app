import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
import userRoutes from './routes/user.routes.js';

import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());

app.use(cors({
  origin: [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1',
    'http://127.0.0.1:5500'
  ],
  credentials: true
}));

// Middleware de compatibilidad
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

// Rutas
app.use('/api/clients', clientRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// ❌ Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ❌ Middleware de errores (SIEMPRE el último)
app.use(errorHandler);

export default app;
