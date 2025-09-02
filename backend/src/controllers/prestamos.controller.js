const db = require('../config/db');

class PrestamosController {
    // Registrar un préstamo
    async registrarPrestamo(req, res) {
        try {
            const { fecha_prestamo, fecha_prevista, libro, usuario } = req.body;

            if (!fecha_prestamo || !fecha_prevista || !libro || !usuario) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const query = `
                INSERT INTO prestamos (fecha_prestamo, fecha_prevista, libro, usuario)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [fecha_prestamo, fecha_prevista, libro, usuario]);

            res.status(201).json({ message: 'Préstamo registrado', id_prestamo: result.insertId });
        } catch (error) {
            console.error('Error al registrar préstamo:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Obtener todos los préstamos
    async obtenerPrestamos(req, res) {
        try {
            const query = `
                SELECT p.id_prestamo, p.fecha_prestamo, p.fecha_prevista, p.devolucion_real,
                       l.titulo AS libro, u.nombre AS usuario
                FROM prestamos p
                JOIN libros l ON p.libro = l.id_libro
                JOIN usuarios u ON p.usuario = u.id_usuario
            `;
            const [rows] = await db.execute(query);
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener préstamos:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Registrar devolución
    async registrarDevolucion(req, res) {
        try {
            const { id } = req.params;
            const { devolucion_real } = req.body;

            const query = `UPDATE prestamos SET devolucion_real = ? WHERE id_prestamo = ?`;
            const [result] = await db.execute(query, [devolucion_real, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Préstamo no encontrado' });
            }

            res.json({ message: 'Devolución registrada' });
        } catch (error) {
            console.error('Error al registrar devolución:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
}

module.exports = PrestamosController;
