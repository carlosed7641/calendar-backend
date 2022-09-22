const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection(); 

//CORS
app.use(cors());
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});

//Directorio público
app.use(express.static('public'));

//Lectura y el parseo del body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const port = process.env.PORT || 4000;

//Escuchar peticiones
app.listen(port, () => {
    console.log('Servidor corriendo!!')
});
