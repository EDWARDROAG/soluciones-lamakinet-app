const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');
const AppError = require('../../utils/AppError');



// ===============================
// REGISTER
// ===============================
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new AppError('Todos los campos son obligatorios', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('El usuario ya existe', 409);
    }

    const user = await User.create({
      email,
      password,
      name
    });

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente'
    });
  } catch (error) {
    next(error);
  }
};
// ===============================
// LOGIN + JWT
// ===============================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email y contraseña son obligatorios', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(error); // 👈 CLAVE
  }
};

module.exports = { register, login };
