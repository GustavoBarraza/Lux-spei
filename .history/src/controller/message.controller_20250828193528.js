import pool from "../config/db.js";

<<<<<<< HEAD
// get all messages
export const getMessages = async (req, res) => {
    try {
        const [messages] = await pool.query(
            "SELECT * FROM messages"
        );
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

// get all messages by id
export const getMessagesById = async (req, res) => {
    const { id } = req.params;

    try {
        const [messages] = await pool.query(
            "SELECT * FROM messages WHERE id_message = ?",
            [id]
        );

        if (messages.length === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json(messages[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// create a message for a post
export const createMessage = async (req, res) => {
    try {
        const { id_chat, id_user, content } = req.body;

        const newMessage = await pool.query(
            "INSERT INTO messages (id_chat,id_user,content) VALUES (?,?,?)",
            [id_chat, id_user, content]
        );

        if (newMessage.length === 0) {
            return res.status(404).json({ error: "Message not sent" })
        };

        res.json(newMessage[0])
=======
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

>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    };
<<<<<<< HEAD
};

// delete a message
export const deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM messages WHERE id_message = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }

        return res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
=======
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
};