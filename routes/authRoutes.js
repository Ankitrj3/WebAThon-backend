// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Get user profile (requires authentication)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
