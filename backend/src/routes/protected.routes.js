import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * ===============================
 * 🔐 RUTAS PROTEGIDAS DE PRUEBA
 * ===============================
 * - Valida JWT
 * - Inyecta req.user
 * - Útil para testear autenticación
 */
router.use(protect);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ruta protegida OK',
    user: req.user
  });
});

export default router;
