//Rutas de control
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');

//Devolver datos
router.get('/', (req, res) => {
    //res.json('Hola');
    res.render('usuarios/index');
});

//Rutas
router.post('/', (req, res) => {
    //console.log(req.body);
    if (req.body._id == '') {
        registrar(req, res);
    } else {
        actualizar(req, res);
    }
});

//Funcion para registrar
function registrar(req, res) {
    var usuario = new Usuario();
    usuario.id = req.body.id;
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;

    usuario.save((err, doc) => {
        if (!err) {
            res.redirect('usuario/lista');
            console.log('Registro Insertado con Exito!')
        } else {
            console.log('Error al guardar' + err);
        }
    });
}
//LISTAR
router.get('/lista', (req, res) => {
    //res.json('Registro Insertado');
    Usuario.find((err, docs) => {
        if (!err) {
            res.render("usuarios/lista", {
                lista: docs
            })
        } else {
            console.log('Error al consultar los datos ..' + err);
        }
    })
});

//Recoger el id del registro Actualizar
router.get('/:id', (req, res) => {
    Usuario.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('usuarios/index', {
                usuario: doc
            });
        }
    });
});

function actualizar(req, res) {
    Usuario.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect("usuario/lista");
        } else {
            console.log('Error al actualizar' + err);
        }
    });
}

router.get('/delete/:id', (req, res) => {
    Usuario.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/usuario/lista');
        } else {
            console.log('Error al eliminar' + err);
        }
    });
});

//Exportar el modulo
module.exports = router;