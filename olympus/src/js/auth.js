const API = "http://localhost:3000/usuarios";

/**
 * Inicia sesión validando email y password.
 * Si es correcto -> guarda el usuario en localStorage
 */
export async function login(email, password) {
  try {
    const res = await fetch(`${API}?email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length > 0) {
      const usuario = data[0];
      localStorage.setItem("usuario", JSON.stringify(usuario));
      return usuario;
    } else {
      throw new Error("❌ Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

/**
 * Cierra sesión eliminando al usuario del localStorage
 */
export function logout() {
  localStorage.removeItem("usuario");
  // Redirige siempre al landing
  window.location.hash = "#/";
}

/**
 * Devuelve el usuario actual guardado en localStorage
 */
export function getUsuarioActual() {
  return JSON.parse(localStorage.getItem("usuario"));
}
