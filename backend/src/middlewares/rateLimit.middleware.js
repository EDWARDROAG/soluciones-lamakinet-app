import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log('🚫 RATE LIMIT ACTIVADO');
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de inicio de sesión. Intenta más tarde.'
    });
  }
});

export default loginLimiter;
