import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ===============================
// 👥 LISTAR USUARIOS
// ===============================
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// 👤 OBTENER PERFIL PROPIO
// ===============================
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// ===============================
// ✏️ ACTUALIZAR PERFIL PROPIO
// ===============================
export const updateMe = async (req, res, next) => {
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
};

// ===============================
// 🔐 CAMBIAR CONTRASEÑA
// ===============================
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'La contraseña actual y la nueva son obligatorias'
      });
    }

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
        message: 'La contraseña actual es incorrecta'
      });
    }

    // 🔐 HASH EXPLÍCITO (OPCIÓN 1)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      message: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    next(error);
  }
};
