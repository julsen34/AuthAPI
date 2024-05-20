// src/config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carga variables de entorno desde el archivo .env
dotenv.config();

// URL de conexión a la base de datos
const dbURI = process.env.DB_URI;

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
