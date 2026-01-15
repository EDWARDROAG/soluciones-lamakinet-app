const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // 🔑 BUSCAR USUARIO REAL EN BD
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'Usuario no encontrado'
      });
    }

    // 👤 Usuario COMPLETO
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
};

module.exports = authMiddleware;
