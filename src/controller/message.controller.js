import pool from "../config/db.js";

export const createMessage = async (req, res) => {

    try {
        
        const {id_chat, id_user, content} = req.body;

            const newMessage = await pool.query(

                "INSERT INTO messages (id_chat,id_user,content) VALUES (?,?,?)",
                [id_chat, id_user, content]
            );

            if (newMessage.length === 0) {
                return res.status(404).json({error: "unsend message"})
            };

            res.json(newMessage[0])

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    };
};