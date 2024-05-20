// src/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Carga variables de entorno desde el archivo .env
dotenv.config();

// Función para generar token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Registro de usuario
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const user = await User.create({ username, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Datos de usuario no válidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Inicio de sesión de usuario
const authUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña no válidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { registerUser, authUser };
