const express = require('express');
const router = express.Router();
const PrestamosController = require('../controllers/prestamos.controller');
const prestamosController = new PrestamosController();

router.post('/', (req, res) => prestamosController.registrarPrestamo(req, res));
router.get('/', (req, res) => prestamosController.obtenerPrestamos(req, res));
router.put('/:id/devolucion', (req, res) => prestamosController.registrarDevolucion(req, res));

module.exports = router;
