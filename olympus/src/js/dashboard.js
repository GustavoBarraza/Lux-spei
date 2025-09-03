// dashboard.js
const token = localStorage.getItem("token");

if (!token) {
  alert("Debes iniciar sesión primero");
  window.location.href = "/src/views/login.html"; 
} else {
  // Mostrar el nombre del usuario si quieres
  const usuario = JSON.parse(localStorage.getItem("user_id"));
  const titulo = document.querySelector(".titulo");
  if (usuario && titulo) {
    titulo.textContent = `Dashboard - ${usuario.name}`;
  }
}

// Seleccionamos el botón y el menú
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');

  if (!hamburger || !navCenter) return;

  // Abrir/cerrar el menú
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navCenter.classList.toggle('show');
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
      navCenter.classList.remove('show');
    }
  });
});
