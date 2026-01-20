import express from 'express';
import loginLimiter from '../../middlewares/rateLimit.middleware.js';
import protect from '../../middlewares/auth.middleware.js';


import {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword
} from '../../controllers/auth/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// 🔐 USUARIO LOGUEADO
router.post('/change-password', protect, changePassword);

export default router;
