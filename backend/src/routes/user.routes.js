import express from 'express';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middlewares/auth.middleware.js';
import User from '../models/User.js';

const router = express.Router();

// 🔐 LISTAR USUARIOS
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// ===============================
// 👤 PERFIL DEL USUARIO LOGUEADO
// ===============================

// 🔹 OBTENER MIS DATOS
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

// 🔹 ACTUALIZAR MIS DATOS
router.put('/me', authMiddleware, async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const userUpdated = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email, phone },
      { new: true, select: '-password' }
    );

    res.status(200).json({
      success: true,
      data: userUpdated
    });
  } catch (error) {
    next(error);
  }
});

// 🔐 CAMBIO DE CONTRASEÑA
router.put('/change-password', authMiddleware, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Datos incompletos'
      });
    }

    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Contraseña actual incorrecta'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
