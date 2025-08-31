import { verify_token } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify_token(token);
    req.user = decoded; // info del usuario disponible en las rutas
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};