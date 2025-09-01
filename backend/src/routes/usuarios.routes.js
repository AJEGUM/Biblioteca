const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarios.controller');
const usuariosController = new UsuariosController();

// Crear usuario
router.post('/', (req, res) => usuariosController.crearUsuario(req, res));

// Obtener todos los usuarios
router.get('/', (req, res) => usuariosController.obtenerUsuarios(req, res));

// Actualizar usuario
router.put('/:id', (req, res) => usuariosController.actualizarUsuario(req, res));

// Borrar usuario
router.delete('/:id', (req, res) => usuariosController.borrarUsuario(req, res));

module.exports = router;
