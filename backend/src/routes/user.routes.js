const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth.middleware');
const User = require('../models/User');

// 🔐 LISTAR USUARIOS (YA EXISTE – OK)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios'
    });
  }
});


// ===============================
// 👤 PERFIL DEL USUARIO LOGUEADO
// ===============================

// 🔹 OBTENER MIS DATOS
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
});

// 🔹 ACTUALIZAR MIS DATOS
router.put('/me', authMiddleware, async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil'
    });
  }
});

router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Datos incompletos'
      });
    }

    // 🔑 VOLVER A CARGAR USUARIO CON PASSWORD
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

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
    console.error('❌ Error change-password:', error);
    res.status(500).json({
      message: 'Error al cambiar contraseña'
    });
  }
});

module.exports = router;
