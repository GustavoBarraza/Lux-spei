// Definir las rutas y su contenido
const routes = {
  "/": () => `
    <div class="welcome-page">
      <h1>Bienvenido</h1>
      <p>Conéctate con otros deportistas, mejora tu rendimiento y alcanza tus metas.</p>
      <div class="buttons-container">
        <button onclick="location.hash = '/login'">Iniciar sesión</button>
        <button onclick="location.hash = '/register'">Registrarse</button>
      </div>
    </div>
  `,
  "/register": () => `
    <h1>Registro de Deportista</h1>
    <form action="/submit" method="POST">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" required>

      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>

      <label for="confirm-password">Confirmar Contraseña:</label>
      <input type="password" id="confirm-password" name="confirm-password" required>

      <button type="submit">Registrarse</button>
    </form>
  `,
  "/login": () => `
    <h1>Iniciar sesión</h1>
    <form action="/submit" method="POST">
      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" required>

      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>

      <button type="submit">Iniciar sesión</button>
    </form>
  `,
};

// Función para renderizar contenido según ruta
function router() {
  const path = location.hash.replace("#", "") || "/";
  const app = document.getElementById("app");

  if (routes[path]) {
    app.innerHTML = routes[path]();
  } else {
    app.innerHTML = `<h1>404</h1><p>Página no encontrada</p><button onclick="location.hash = '/'">Ir a Inicio</button>`;
  }
}

// Escuchar cambios en el hash de la URL
window.addEventListener("hashchange", router);

// Renderizar contenido cuando la página se cargue por primera vez
window.addEventListener("load", router);
