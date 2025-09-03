import pool from "../config/db.js";

// Obtener todos los chats del usuario
export const getChats = async (req, res) => {
    const { id_user } = req.user;

    try {
        const [chats] = await pool.query(
            "SELECT * FROM chats WHERE id_user = ? ORDER BY created_at DESC",
            [id_user]
        );
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener chat por ID
export const getChatsById = async (req, res) => {
    const { id } = req.params;
    const { id_user } = req.user;

    try {
        const [chats] = await pool.query(
            "SELECT * FROM chats WHERE id_chat = ? AND id_user = ?",
            [id, id_user]
        );

        if (chats.length === 0) return res.status(404).json({ message: 'Chat not found' });
        res.json(chats[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear chat
export const createChat = async (req, res) => {
    try {
        const { name, type } = req.body;
        const { id_user } = req.user;

        const [result] = await pool.query(
            "INSERT INTO chats (name,type,id_user) VALUES (?,?,?)",
            [name, type, id_user]
        );

        res.status(201).json({ message: "Chat creado", id_chat: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar chat
export const deleteChat = async (req, res) => {
    const { id } = req.params;
    const { id_user } = req.user;

    try {
        const [result] = await pool.query(
            'DELETE FROM chats WHERE id_chat = ? AND id_user = ?',
            [id, id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.json({ message: 'Chat eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
