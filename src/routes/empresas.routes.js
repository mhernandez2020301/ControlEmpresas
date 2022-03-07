const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const empleadosControlador = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

//GETS De Empleados
api.get('/obtenerEmpleado', md_autenticacion.Auth, empleadosControlador.obtenerEmpleado);

module.exports = api;