import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ruta protegida OK',
    user: req.user
  });
});

export default router;
