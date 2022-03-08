const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

//Registrar Empleado
api.post('/registrarEmpleado', md_autenticacion.Auth, usuariosControlador.RegistrarEmpleado);

//Login
api.post('/login', usuariosControlador.Login);

//CRUD EMPRESA
api.post('/registrarEmpresa', md_autenticacion.Auth, usuariosControlador.RegistrarEmpresa);
api.get('/obtenerEmpresa', md_autenticacion.Auth, usuariosControlador.ObtenerEmpresas);
api.put('/actualizarEmpresa/:idEmpresa', md_autenticacion.Auth, usuariosControlador.EditarEmpresa);
api.delete('/eliminarEmpresa/:idEmpresa', md_autenticacion.Auth, usuariosControlador.EliminarEmpresa);


module.exports = api;