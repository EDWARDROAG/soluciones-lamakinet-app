import express from 'express';
import loginLimiter from '../../middlewares/rateLimit.middleware.js';
import { protect } from '../../middlewares/auth.middleware.js';

import {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword
} from '../../controllers/auth/auth.controller.js';

const router = express.Router();

/**
 * ===============================
 * 🔐 AUTENTICACIÓN
 * ===============================
 */

// Registro público (SIEMPRE client)
router.post('/register', register);

// Login con rate limit
router.post('/login', loginLimiter, login);

// Recuperación de contraseña
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Cambio de contraseña (usuario autenticado)
router.post('/change-password', protect, changePassword);

export default router;
