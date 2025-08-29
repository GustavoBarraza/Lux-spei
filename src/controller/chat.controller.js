import pool from "../config/db.js";

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
};