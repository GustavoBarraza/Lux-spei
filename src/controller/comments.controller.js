import pool from "../config/db.js";

// Get all comments
export const getComments = async (req, res) => {

    try {

        const [comments] = await pool.query('SELECT * FROM comments');
        if (comments.length === 0) return res.status(404).json({ message: 'Comments not found' })

        res.json(comments[0])

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get comments by Id
export const getCommentsById = async (req, res) => {
    const { id_comment } = req.params;

    try {
        const [comments] = await pool.query(
            "SELECT * FROM comments WHERE id_comment = ?",
            [id_comment]
        );

        if (comments.affectedRows === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({
            message: "Comment retrieved successfully",
            comment: comments[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Create coments
export const createComments = async (req, res) => {
    try {
        const { id_user, id_route, content } = req.body;

        const [result] = await pool.query(
            "INSERT INTO comments (id_user, id_route, content) VALUES (?, ?, ?)",
            [id_user, id_route, content]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Comment not created" });
        }

        res.status(201).json({
            message: "Comment created successfully",
            comment: {
                id_comment: result.insertId,
                id_user,
                id_route,
                content
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// delete a comment by id
export const deleteComments = async (req, res) => {
    const { id_comment } = req.params;

    try {
        const [result] = await pool.query(
            "DELETE FROM comments WHERE id_comment = ?",
            [id_comment]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // ✅ Respuesta clara al cliente
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};