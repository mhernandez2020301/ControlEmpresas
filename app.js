// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuariosRutas = require('./src/routes/usuarios.routes');
const EmpleadosRutas = require('./src/routes/empresas.routes');


// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cabecera
app.use(cors());

// Cargar Rutas
app.use('/api', UsuariosRutas, EmpleadosRutas);


module.exports = app;