const db = require('../config/db');

class LibrosController {

    // Registrar un libro
    async registrarLibro(req, res) {
        console.log(req.body)
        try {
            const { titulo, ISBN, anio_publicacion, id_categorias } = req.body;
            if (!titulo || !ISBN || !anio_publicacion || !id_categorias) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const query = 'INSERT INTO libros (titulo, ISBN, anio_publicacion, id_categorias) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [titulo, ISBN, anio_publicacion, id_categorias]);

            res.status(201).json({ message: 'Libro registrado', id_libro: result.insertId });
        } catch (error) {
            console.error('Error al registrar libro:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Obtener todos los libros
    async obtenerLibros(req, res) {
        try {
            const query = 'SELECT l.id_libro, l.titulo, l.isbn, l.anio_publicacion, c.nombre AS categoria FROM libros l JOIN categorias c ON l.id_categorias = c.id_categoria';
            const [rows] = await db.execute(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener libros:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Actualizar libro
    async actualizarLibro(req, res) {
        try {
            const { id } = req.params;
            const { titulo, ISBN, anio_publicacion, id_categorias } = req.body;

            const query = `
                UPDATE libros
                SET titulo = ?, ISBN = ?, anio_publicacion = ?, id_categorias = ?
                WHERE id_libro = ?
            `;

            const [result] = await db.execute(query, [titulo, ISBN, anio_publicacion, id_categorias, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }

            res.json({ message: 'Libro actualizado' });
        } catch (error) {
            console.error('Error al actualizar libro:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Borrar libro
    async borrarLibro(req, res) {
        try {
            const { id } = req.params;

            const query = 'DELETE FROM libros WHERE id_libro = ?';
            const [result] = await db.execute(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }

            res.json({ message: 'Libro eliminado' });
        } catch (error) {
            console.error('Error al borrar libro:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
}

module.exports = LibrosController;
