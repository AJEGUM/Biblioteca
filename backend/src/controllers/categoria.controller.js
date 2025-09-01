const db = require('../config/db');

class CategoriasController {

    // Crear categoría
    async crearCategoria(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const query = 'INSERT INTO categorias (nombre) VALUES (?)';
            const [result] = await db.execute(query, [nombre]);

            res.status(201).json({ message: 'Categoría creada', id_categoria: result.insertId });
        } catch (error) {
            console.error('Error al crear categoría:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Obtener todas las categorías
    async obtenerCategorias(req, res) {
        try {
            const [rows] = await db.execute('SELECT * FROM categorias');
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Actualizar categoría
    async actualizarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const query = 'UPDATE categorias SET nombre = ? WHERE id_categoria = ?';
            const [result] = await db.execute(query, [nombre, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            res.json({ message: 'Categoría actualizada' });
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Borrar categoría
    async borrarCategoria(req, res) {
        try {
            const { id } = req.params;

            const query = 'DELETE FROM categorias WHERE id_categoria = ?';
            const [result] = await db.execute(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            res.json({ message: 'Categoría eliminada' });
        } catch (error) {
            console.error('Error al borrar categoría:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
}

module.exports = CategoriasController;
