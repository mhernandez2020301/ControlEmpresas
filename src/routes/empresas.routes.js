const express = require('express');
const empleadosControlador = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const PDFcon = require('../services/pdf-service');

const api = express.Router();
api.delete('/eliminarEmpleado/:idEmpleado', md_autenticacion.Auth, empleadosControlador.eliminarEmpleado);
api.put('/actualizarEmpleado/:idEmpleado', md_autenticacion.Auth, empleadosControlador.editarEmpleado);

//GETS De Empleados
api.get('/obtenerEmpleado', md_autenticacion.Auth, empleadosControlador.obtenerEmpleado);
api.get('/obtenerEmpleadoxId/:idEmpleado', md_autenticacion.Auth, empleadosControlador.obtenerEmpleadoxID);
api.get('/obtenerEmpleadoxNombre', md_autenticacion.Auth, empleadosControlador.obtenerEmpleadoporNombre);
api.get('/obtenerEmpleadoxDepartamento', md_autenticacion.Auth, empleadosControlador.obtenerEmpleadoporDepartamento);
api.get('/obtenerEmpleadoxPuesto', md_autenticacion.Auth, empleadosControlador.obtenerEmpleadoporPuesto);
api.get('/imprimirpdf', md_autenticacion.Auth, PDFcon.pdfEmpleados);

module.exports = api;