const Usuario = require('../models/empresa.model');
const Empleado = require('../models/empleado.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//Empresas CRUD
function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();
    if (req.user.rol == 'ADMINISTRADOR') {
        if (parametros.nombrecompleto && parametros.email && parametros.password) {
            usuarioModel.nombrecompleto = parametros.nombrecompleto;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'EMPRESA';
            Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
                if (usuarioEncontrado.length == 0) {
                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;
                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if (!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario' });
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
        }
    }
}

function EliminarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    if(req.user.rol == 'ADMINISTRADOR'){
        Usuario.findByIdAndDelete(idEmpresa, (err, empresaEliminada) =>{
            if (err) return res.status(500).send({mensaje: 'Error en la petición'});
            if (!empresaEliminada) return res.status(500).send({ mensaje: 'Error al Eliminar'});

            return res.status(200).send({ usuario: empresaEliminada});
        })
    } else {
        return res.status(500).send({mensaje: 'Acción denegada'})
    }
}

function EditarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var parametros = req.body;

    if (req.user.rol == 'ADMINISTRADOR'){
        Usuario.findByIdAndUpdate(idEmpresa, parametros, {new: true}, (err, empresaEditada)=>{
            if (err) return res.status(500).send({mensaje: 'Error en la petición'});
            if (!empresaEditada) return res.status(500).send({ mensaje: 'No se ha podido editar'});

            return res.status(200).send({usuario: empresaEditada});
        })
    } else{
        return res.status(500).send({ mensaje: 'No tiene los permisos'});
    }
}

function ObtenerEmpresas(req, res){
    Usuario.find({}, (err, empresaEncontrada)=>{
        return res.status(200).send({usuarios: empresaEncontrada});
    })
}

//ADMIN
function RegistrarAdmin() {
    var usuarioModel = new Usuario();
    usuarioModel.nombrecompleto = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.rol = 'ADMINISTRADOR';
    usuarioModel.password = '123456'
    Usuario.find({ email: 'ADMIN' }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;
                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return console.log('No se realiza la peticion')
                    if (!usuarioGuardado) return console.log('error al registrar')
                    return console.log('usuario' + ' ' + usuarioGuardado);
                });
            });
        } else {
            return console.log('');
        }
    })
}

function RegistrarEmpleado(req, res) {
    var parametros = req.body;
    var empleadoModel = new Empleado();
    if (req.user.rol == 'EMPRESA') {
        if (parametros.nombre && parametros.apellido && parametros.puesto && parametros.departamento) {
            empleadoModel.nombre = parametros.nombre;
            empleadoModel.apellido = parametros.apellido;
            empleadoModel.puesto = parametros.puesto;
            empleadoModel.departamento = parametros.departamento;
            empleadoModel.idEmpresa = req.user.sub;
            empleadoModel.save((err, empleadoGuardado) => {
                if (err) return res.status(400).send({ mensaje: 'error en la peticion' });
                if (!empleadoGuardado) return res.status(400).send({ mensaje: 'Error al agregar' });
                return res.status(200).send({ empleado: empleadoGuardado });
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'No tiene los permisos' })
    }
}


function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            usuarioEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        } else {

                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide' });
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.' })
        }
    })
}

function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    if (idUser !== req.user.sub || req.user.rol == 'ADMINISTRADOR') return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios' });

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario' });
            return res.status(200).send({ usuario: usuarioActualizado })
        })
}

module.exports = {
    RegistrarEmpresa,
    Login,
    EditarUsuario,
    RegistrarAdmin,
    RegistrarEmpleado,
    EliminarEmpresa,
    EditarEmpresa,
    ObtenerEmpresas
}