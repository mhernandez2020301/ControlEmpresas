const fs = require('fs');
const res = require('express/lib/request');
const doc = require('pdfkit');
const Empleado = require('../controllers/empresas.controller')
const documentoempleados = new doc;

function pdfEmpleados(){

    Empleado.find({}, (err, empleadosPDF) => {

        for (let i = 0; i < empleadosPDF.length; i++){
            doc.pipe(fs.createWriteStream('pdf/Empleados.pdf'));
            doc.text(`${empleadosPDF[i].nombre}, ${empleadosPDF[i].apellidos},
                 ${empleadosPDF[i].idEmpresa}`)
        }
        doc.end();
    })
}
module.exports = {
    pdfEmpleados
}