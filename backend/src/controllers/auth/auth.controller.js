import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import AppError from '../../utils/AppError.js';


// ===============================
// REGISTER + JWT
// ===============================
export const register = async (req, res, next) => {
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
export const login = async (req, res, next) => {
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

// ===============================
// FORGOT PASSWORD
// ===============================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Seguridad: responder igual siempre
    if (!user) {
      return res.json({ success: true });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 min

    await user.save();

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;

    console.log('🔐 RESET PASSWORD URL:', resetUrl);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// ===============================
// RESET PASSWORD
// ===============================
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new AppError('Token inválido o expirado', 400);
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// ===============================
// CHANGE PASSWORD (USER LOGGED)
// ===============================
export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError('Todos los campos son obligatorios', 400);
    }

    // ⚠️ IMPORTANTE: +password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError('Contraseña actual incorrecta', 400);
    }

    // ✅ ASIGNAR EN PLANO
    // ❌ NO hashear aquí
    user.password = newPassword;

    // 🔥 AQUÍ se ejecuta el pre('save')
    await user.save();

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

