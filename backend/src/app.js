require('dotenv').config();
const express = require('express') 
const cors = require('cors')      
const app = express()

app.use(cors()) 
app.use(express.json({ limit: '20mb'}))

app.use(express.urlencoded({ extended: true, limit: '20mb'})) 

app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/libros', require('./routes/libros.routes'))

module.exports = app