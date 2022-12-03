require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const app = express();

//Gestionar las vistas
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'hbs');

const usuarioControl = require('./Controlador/usuarioControl');

//Middlewares
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//Llamadas
app.use('/usuario', usuarioControl);

//Configuración
app.set('port', process.env.PORT || 3000);
//Puerto de escucha
app.listen(app.get('port'), () => {
    console.log('Servicio corriendo en el puerto...', app.get('port'));
});