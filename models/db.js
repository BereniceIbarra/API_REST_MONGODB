//Conexion a la DB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/API_REST', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("Conexión exitosa DB");
    } else {
        console.log("Error en la conexión.." + err);
    }
});
//Requerir
require('./usuario.model');