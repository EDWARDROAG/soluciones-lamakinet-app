const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');

// ===============================
// REGISTER + JWT
// ===============================
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
      throw new AppError('Todos los campos son obligatorios', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('El correo ya está registrado', 409);
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password
    });

    // 🔑 TOKEN CON firstName
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      token
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

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // 🔑 TOKEN CON firstName
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
