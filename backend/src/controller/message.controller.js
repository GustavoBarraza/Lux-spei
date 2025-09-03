import pool from "../config/db.js";

// Obtener mensajes de un chat
export const getMessagesByChat = async (req, res) => {
    if (!req.user || !req.user.id_user) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { id_chat } = req.params;
    const { id_user } = req.user;

    try {
        const [chat] = await pool.query(
            "SELECT * FROM chats WHERE id_chat = ? AND id_user = ?",
            [id_chat, id_user]
        );
        if (chat.length === 0) return res.status(404).json({ message: "Chat no encontrado" });

        const [messages] = await pool.query(
            "SELECT m.*, u.name FROM messages m JOIN users u ON m.id_user = u.id_user WHERE m.id_chat = ? ORDER BY m.created_at ASC",
            [id_chat]
        );

        res.json(messages);
    } catch (error) {
        console.error("Error en getMessagesByChat:", error);
        res.status(500).json({ error: error.message });
    }
};

// Crear mensaje
export const createMessage = async (req, res) => {
    const { id_chat, content } = req.body;
    const { id_user } = req.user;

    try {
        const [result] = await pool.query(
            "INSERT INTO messages (id_chat, id_user, content) VALUES (?, ?, ?)",
            [id_chat, id_user, content]
        );

        res.status(201).json({ message: "Mensaje enviado", id_message: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
