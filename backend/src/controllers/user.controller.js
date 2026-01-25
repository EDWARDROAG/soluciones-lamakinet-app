import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/**
 * ===============================
 * 👥 LISTAR USUARIOS
 * ===============================
 * Reglas (reforzadas por rutas):
 * - super_admin → ve todos los usuarios
 * - admin       → ve usuarios (la lógica fina se puede filtrar después)
 */
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

/**
 * ===============================
 * 👤 OBTENER PERFIL PROPIO
 * ===============================
 */
export const getMe = async (req, res, next) => {
  try {
    // ⚠️ usamos req.user.id (inyectado por protect)
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * ===============================
 * ✏️ ACTUALIZAR PERFIL PROPIO
 * ===============================
 * Reglas:
 * - Solo datos básicos
 * - NO se permite cambiar rol ni email
 */
export const updateMe = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const userUpdated = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone },
      { new: true }
    ).select('-password');

    res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
};

/**
 * ===============================
 * 🔐 CAMBIAR CONTRASEÑA
 * ===============================
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'La contraseña actual y la nueva son obligatorias'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

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

    // 🔐 Nueva contraseña (hash automático en pre-save)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: 'Contraseña actualizada correctamente'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ===============================
 * 🧑‍💼 CREAR ADMIN
 * ===============================
 * Reglas:
 * - SOLO super_admin (validado en rutas)
 * - No se puede crear super_admin
 */
export const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      });
    }

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'admin'
    });

    res.status(201).json({
      message: 'Administrador creado correctamente',
      data: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ===============================
 * 🧾 CREAR CAJERO
 * ===============================
 * Reglas:
 * - super_admin y admin (validado en rutas)
 */
export const createCashier = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      });
    }

    const cashier = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: 'cashier'
    });

    res.status(201).json({
      message: 'Cajero creado correctamente',
      data: {
        id: cashier._id,
        email: cashier.email,
        role: cashier.role
      }
    });
  } catch (error) {
    next(error);
  }
};
