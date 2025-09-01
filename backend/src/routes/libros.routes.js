const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/libros.controller');
const librosController = new LibrosController();

router.post('/', (req, res) => librosController.registrarLibro(req, res));
router.get('/', (req, res) => librosController.obtenerLibros(req, res));
router.put('/libros/:id', (req, res) => librosController.actualizarLibro(req, res));
router.delete('/libros/:id', (req, res) => librosController.borrarLibro(req, res));

module.exports = router;