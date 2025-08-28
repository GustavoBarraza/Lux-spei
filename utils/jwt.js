import dotenv from "dotenv"
import jwt from "jsonwebtoken"


dotenv.config();

const TOKEN = process.env.JWT_SECRET;

// Validar que la variable de entorno JWT_SECRET existe
if (!TOKEN) {
  throw new Error("JWT_SECRET no está definido. Revisa tu archivo .env");
}

/**
 * Crea un token JWT a partir de un payload.
 * @param {object} payload - Los datos a incluir en el token.
 * @param {string} expiresIn - Tiempo de expiración del token (ej: "7d").
 * @returns {string} El token JWT.
 */
export const tigger_token = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, TOKEN, { expiresIn });
};

/**
 * Verifica un token JWT y devuelve su payload.
 * @param {string} token - El token JWT a verificar.
 * @returns {object|null} El payload decodificado si es válido, o null si falla la verificación.
 */
export const verify_token = (token) => {
  try {
    const decoded = jwt.verify(token, TOKEN);
    return decoded;
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return null;
  }
};