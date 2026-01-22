import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  getUsers,
  getMe,
  updateMe,
  changePassword
} from '../controllers/user.controller.js';

const router = express.Router();

// ===============================
// 🔐 LISTAR USUARIOS
// ===============================
router.get('/', authMiddleware, getUsers);

// ===============================
// 👤 PERFIL DEL USUARIO LOGUEADO
// ===============================

// 🔹 OBTENER MIS DATOS
router.get('/me', authMiddleware, getMe);

// 🔹 ACTUALIZAR MIS DATOS
router.put('/me', authMiddleware, updateMe);

// 🔐 CAMBIO DE CONTRASEÑA
router.put('/change-password', authMiddleware, changePassword);

export default router;
