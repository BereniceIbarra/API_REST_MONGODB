//Modelo
const mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    id: String,
    nombre: String,
    apellido: String
});

mongoose.model('Usuario', usuarioSchema);