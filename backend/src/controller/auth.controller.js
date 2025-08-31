// src/controllers/auth.controller.js
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { tigger_token } from "../../utils/jwt.js";

// Registro
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const [rows] = await pool.query("SELECT id_user FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Hashear contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await pool.query(
      "INSERT INTO users ( name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    const token = tigger_token({ id_user: result.insertId, email });

    res.status(201).json({ message: "user login correctly", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    const user = rows[0];

    // Verificar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "invalid credentials" });
    }

    const token = tigger_token({ id_user: user.id_user, email: user.email });

    res.json({ message: "correctly login", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
