import express from 'express';


/**
 * 🔐 Middlewares de seguridad
 * protect         → valida JWT
 * authorizeRoles  → valida permisos por rol
 */
import {
  protect,
  authorizeRoles
} from '../middlewares/auth.middleware.js';

import {
  getUsers,
  getMe,
  updateMe,
  changePassword,
  createAdmin,
  createCashier
} from '../controllers/user.controller.js';

const router = express.Router();

/**
 * ===============================
 * 👥 LISTAR USUARIOS
 * ===============================
 * Reglas:
 * - super_admin → puede ver todos
 * - admin       → puede ver clientes y cajeros (lógica en el controller)
 */
router.get(
  '/',
  protect,
  authorizeRoles('super_admin', 'admin'),
  getUsers
);

/**
 * ===============================
 * 👤 PERFIL DEL USUARIO LOGUEADO
 * ===============================
 * Reglas:
 * - CUALQUIER usuario autenticado puede acceder
 */

// 🔹 OBTENER MIS DATOS
router.get('/me', protect, getMe);

// 🔹 ACTUALIZAR MIS DATOS
router.put('/me', protect, updateMe);

// 🔐 CAMBIO DE CONTRASEÑA
router.put('/change-password', protect, changePassword);

/**
 * ===============================
 * 🧑‍💼 CREACIÓN DE USUARIOS INTERNOS
 * ===============================
 */

// 🔹 CREAR ADMIN (SOLO super_admin)
router.post(
  '/create-admin',
  protect,
  authorizeRoles('super_admin'),
  createAdmin
);

// 🔹 CREAR CAJERO (super_admin y admin)
router.post(
  '/create-cashier',
  protect,
  authorizeRoles('super_admin', 'admin'),
  createCashier
);

export default router;
