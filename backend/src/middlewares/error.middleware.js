import AppError from '../utils/AppError.js';

const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR:', err);

  // Errores controlados
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Errores no controlados
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
};

export default errorHandler;
