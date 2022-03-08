const fs = require('fs');
const res = require('express/lib/request');
const doc = require('pdfkit');
const Empleado = require('../models/empleado.model')
const documentoempleados = new doc;

function pdfEmpleados(){

    Empleado.find({}, (err, empleadosEncontrados) => {
        
        for (let i = 0; i < empleadosEncontrados.length; i++){
            doc.pipe(fs.createWriteStream('pdf/EmpleadosEmpresas.pdf'));
            doc.text(`${empleadosEncontrados[i].nombre},  ${empleadosEncontrados[i].departamento},
                ${empleadosEncontrados[i].correo}`) 
        }
        doc.end();
    }) 
}
module.exports = {
    pdfEmpleados
}