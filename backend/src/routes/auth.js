const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// POST /api/v1/auth/google
router.post('/google', validate(authController.googleLoginSchema), authController.loginWithGoogle);

// GET /api/v1/auth/me
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
