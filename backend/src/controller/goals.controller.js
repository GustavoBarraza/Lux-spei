import pool from "../config/db.js";


// Crear meta
export const createGoal = async (req, res) => {
  try {
    const { id_user } = req.user;
    const {
      title,
      description,
      target_distance,
      target_duration,
      target_date,
      goal_type_name // ahora el tipo de meta lo recibe como nombre
    } = req.body;

    // 1️⃣ Verificar si el tipo de meta existe
    const [rows] = await pool.query(
      "SELECT id_goal_type FROM goal_types WHERE name = ?",
      [goal_type_name]
    );

    let goal_type_id;

    if (rows.length === 0) {
      // Crear tipo de meta si no existe
      const [insert] = await pool.query(
        "INSERT INTO goal_types (name) VALUES (?)",
        [goal_type_name]
      );
      goal_type_id = insert.insertId;
    } else {
      goal_type_id = rows[0].id_goal_type;
    }

    // 2️⃣ Insertar la meta
    const [result] = await pool.query(
      `INSERT INTO goals 
      (id_user, title, description, target_distance, target_duration, target_date, id_goal_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_user, title, description, target_distance, target_duration, target_date, goal_type_id]
    );

    res.json({ message: "Goal created successfully", goalId: result.insertId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener metas de un usuario
export const getGoals = async (req, res) => {
  try {
    const { id_user } = req.user;

    const [goals] = await pool.query(
      `SELECT g.*, gt.name AS goal_type_name
       FROM goals g
       LEFT JOIN goal_types gt ON g.id_goal_type = gt.id_goal_type
       WHERE g.id_user = ?`,
      [id_user]
    );

    res.json(goals);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
