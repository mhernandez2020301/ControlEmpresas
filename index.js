const mongoose = require('mongoose');
const app = require('./app');
const { RegistrarAdmin } = require('./src/controllers/usuarios.controller')

mongoose.Promise = global.Promise;                                                               
mongoose.connect('mongodb://localhost:27017/ControlEmpresas2020301', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    app.listen(3000, function () {
        console.log("Se esta corriendo en el puerto 3000")
    })

}).catch(error => console.log(error));

RegistrarAdmin();