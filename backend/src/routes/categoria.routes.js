const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/categoria.controller');
const categoriasController = new CategoriasController();

// Crear categoría
router.post('/', (req, res) => categoriasController.crearCategoria(req, res));

// Obtener todas las categorías
router.get('/', (req, res) => categoriasController.obtenerCategorias(req, res));

// Actualizar categoría
router.put('/:id', (req, res) => categoriasController.actualizarCategoria(req, res));

// Borrar categoría
router.delete('/:id', (req, res) => categoriasController.borrarCategoria(req, res));

module.exports = router;
