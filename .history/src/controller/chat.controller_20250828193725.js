import pool from "../config/db.js";

//obtenemos todos los chat que esta utilizando el usuario

export const getChats = async (req, res) => {
    try {
        const [chats] = await pool.query('SELECT * FROM chats');
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//obtenemos todos los chats por id

export const getChatsById = async (req, res) => {
    const { id } = req.params;
    try {
        const [chats] = await pool.query('SELECT * FROM chats WHERE id_chat = ?', [id]);
        if (chats.length === 0) return res.status(404).json({ message: 'Chat not found' });
        res.json(chats[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// creamos un chat para que los usuarios se puedan comunicar
export const createChat = async (req , res) => {
    try {


        const {id_chat,name,type,id_user} = req.body;

        const newChat = await pool.query(


            "INSERT INTO chats (id_chat,name,type,id_user) VALUES (?,?,?,?)",
            [id_chat,name,type,id_user]
        );

        if (newChat.length === 0){
                return res.status(404).json({error: "Chat not created"});
            };

        res.json(newChat[0]);


    } catch (error) {
        res.status(500).json({ error: error.message });
    };
<<<<<<< HEAD
};

// Eliminamos un chat por id

export const deleteChat = async (req, res) => { 
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM chats WHERE id_chat = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
=======
};
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
