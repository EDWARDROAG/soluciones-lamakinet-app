import User from '../models/User.js';

// ===============================
// LISTAR USUARIOS
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
