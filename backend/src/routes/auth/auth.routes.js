const express = require('express');
const router = express.Router();

const { login, register } = require('../../controllers/auth/auth.controller');
const loginLimiter = require('../../middlewares/rateLimit.middleware');

router.post('/register', register);
router.post('/login', loginLimiter, login);

module.exports = router;
