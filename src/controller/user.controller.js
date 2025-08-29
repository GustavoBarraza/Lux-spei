// src/controllers/user.controller.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Obtener perfil del usuario logueado
export const getProfile = async (req, res) => {
  try {
    const { id_user } = req.user; // viene del token

    const [rows] = await pool.query(
      "SELECT id_user, name, email, created_at FROM users WHERE id_user = ?",
      [id_user]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar perfil (nombre, email, password opcional)
export const updateProfile = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { name, email, password } = req.body;

    let query = "UPDATE users SET  name = ?, email = ?, updated_at = NOW()";
    const values = [ name, email];

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += ", password = ?";
      values.push(hashed);
    }

    query += " WHERE id_user = ?";
    values.push(id_user);

    await pool.query(query, values);

    res.json({ message: "profile update correctly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cuenta
export const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.user;

    await pool.query("DELETE FROM users WHERE id_user = ?", [id_user]);

    res.json({ message: "user delete correctly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};