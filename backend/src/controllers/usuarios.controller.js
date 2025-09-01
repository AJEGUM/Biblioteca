const db = require('../config/db');

class UsuariosController {

    // Crear usuario
    async crearUsuario(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const query = 'INSERT INTO usuarios (nombre) VALUES (?)';
            const [result] = await db.execute(query, [nombre]);

            res.status(201).json({ message: 'Usuario creado', id_usuario: result.insertId });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Obtener todos los usuarios
    async obtenerUsuarios(req, res) {
        try {
            const [rows] = await db.execute('SELECT * FROM usuarios');
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Actualizar usuario
    async actualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });

            const query = 'UPDATE usuarios SET nombre = ? WHERE id_usuario = ?';
            const [result] = await db.execute(query, [nombre, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({ message: 'Usuario actualizado' });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }

    // Borrar usuario
    async borrarUsuario(req, res) {
        try {
            const { id } = req.params;

            const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
            const [result] = await db.execute(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({ message: 'Usuario eliminado' });
        } catch (error) {
            console.error('Error al borrar usuario:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
}

module.exports = UsuariosController;
