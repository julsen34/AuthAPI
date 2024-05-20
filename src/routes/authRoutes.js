// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// Ruta para registro de usuario
router.post('/register', registerUser);

// Ruta para inicio de sesión
router.post('/login', authUser);

module.exports = router;
