// dashboard.js
const token = localStorage.getItem("token");

if (!token) {
  alert("Debes iniciar sesión primero");
  window.location.href = "/src/views/login.html"; 
} else {
  // Mostrar el nombre del usuario si quieres
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const titulo = document.querySelector(".titulo");
  if (usuario && titulo) {
    titulo.textContent = `Dashboard - ${usuario.name}`;
  }
}
