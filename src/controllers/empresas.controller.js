const Empleado = require('../models/empleado.model');

function obtenerEmpleado(req, res){
    var idEmpresa = req.params.idEmpresa;

    if(req.user.rol == 'EMPRESA'){
        Empleado.find({}, (err, empleadosEncontrados)=>{
            return res.status(500).send({empleado: empleadosEncontrados});
    
        })
    }else{
        return res.status(500).send({mensaje: 'No tiene permiso'})
    }
}

function eliminarEmpleado(req, res) {
    var empleadoId = req.params.idEmpleadoId;
    var empresaId = req.user.sub;

    Empleado.findOne({empresaId: empleadoId}, (err, empleadoEncontradoyEliminado) => {
        if (err) return res.status(500).send({mensaje: 'Error en la petición'});
        if (empleadoEncontradoyEliminado.empresaId !== Empleado.idEmpresa){
            return res.status(500).send({mensaje: 'No puede eliminar un empleado que no sea suyo'})
        } else{
            Empleado.findByIdAndDelete(empleadoId, (err, empleadoEncontradoyEliminado) => {
                if(err) return res.status(500).send({mensaje:'Error en la petición'});
                if(!empleadoEncontradoyEliminado) return res.status(500).send({mensaje:'Error al eliminar'});

                return res.status(500).send({empleado: empleadoEncontradoyEliminado});
            })
        }
    })
}

module.exports = {
    obtenerEmpleado,
    eliminarEmpleado
}