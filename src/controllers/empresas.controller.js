const Empleado = require('../models/empleado.model');



function eliminarEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;
    var empresaId = req.user.sub;

    Empleado.findOne({empresaId: empleadoId}, (err, empresaEncontrados) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
        
        if(empresaEncontrados.empresaId !== Empleado.idEntidad){
            return res.status(500).send({ mensaje: 'no puede eliminar empleados de otras empresas'})
        }else{
            Empleado.findByIdAndDelete(empleadoId, (err, empleadoEliminado)=>{
                if(err) return res.status(400).send({ mensaje: "Error en la peticion"});
                if(!empleadoEliminado) return res.status(400).send({ mensaje: "Error al eliminar el empleado"});
    
                return res.status(200).send({ empleado: empleadoEliminado});
            })
        }
    })
    
}

function editarEmpleado(req, res){
    var empleadoId = req.params.idEmpleado;
    var parametros = req.body;
    var modeloEmpleado = new Empleado();
    var empresaId = req.user.params;

    Empleado.findOne({empresaId: empleadoId}, (err, empresaEncontrados)=>{
        if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
        
        if(empresaEncontrados.empresaId !== Empleado.idEntidad){
            return res.status(500).send({ mensaje: 'no puede eliminar empleados de otras empresas'})
        }else{

            modeloEmpleado.nombre = parametros.nombre;
            modeloEmpleado.correo = parametros.correo;
            modeloEmpleado.puesto = parametros.puesto;

            Empleado.findByIdAndUpdate(empleadoId, parametros, {new: true}, (err, empleadoEditado) => {
                if(err){ return res.status(500).send({mensaje: 'Error en la peticion'})};
                if(!empleadoEditado){ return res.status(500).send({mensaje: 'Error al actualizar el empleado'})};

                return res.status(200).send({ empleado: empleadoEditado})
            })

        }
    })

}

//Busquedas de Empleados
function obtenerEmpleadoxID(req,res){
    var idEmpleado = req.params.idEmpleado;
    Empleado.findById(idEmpleado,(err,empleadoEncontrado)=>{
       if(err) return res.status('error en la peticion');
       if(!empleadoEncontrado) return res.status('erro al obtener el empleado');
       return res.status(200).send({empleado:empleadoEncontrado}),
       console.log(empleadoEncontrado._id);
    })
}

function obtenerEmpleadoporNombre(req, res) {
    var Empleadonombre = req.body.nombre;
    Empleado.findOne({nombre: Empleadonombre}, (err, empleadospornombreEncontrados) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!empleadospornombreEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar el empleado' });

        return res.status(200).send({ empleados: empleadospornombreEncontrados });
    })
}

function obtenerEmpleadoporDepartamento(req, res) {
    var Empleadodepartamento = req.body.departamento;

    Empleado.find({departamento: Empleadodepartamento}, (err, empleadopordepartamentosEncontrados) => {
        if (err) { return res.status(500).send({ mensaje:'Error en la peticion' }) };
        if (!empleadopordepartamentosEncontrados) return res.status(500).send({ mensaje:'Error al encontrar el empleado'})
        return res.status(200).send({ empleados: empleadopordepartamentosEncontrados })
    })
}

function obtenerEmpleadoporPuesto(req, res) {
    var Empleadopuesto = req.body.puesto;

    Empleado.find( {puesto: Empleadopuesto}, (err, empleadoencontradoporpuestoEncontrados) => {
        if (err)  return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!empleadoencontradoporpuestoEncontrados) return res.status(500).send({ mensaje: 'Error al encontrar el empleado' })
        return res.status(200).send({ empleados: empleadoencontradoporpuestoEncontrados })
    })
}

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



module.exports = {
    obtenerEmpleado,
    eliminarEmpleado,
    editarEmpleado,
    obtenerEmpleadoporNombre,
    obtenerEmpleadoporDepartamento,
    obtenerEmpleadoporPuesto,
    obtenerEmpleadoxID
}