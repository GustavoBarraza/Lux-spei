document.getElementById("formPerfil").addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener valores
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const nivel = document.getElementById("nivel").value;
  const especialidad = document.getElementById("especialidad").value;

  // Guardar en localStorage (simulación de base de datos)
  const datos = { nombre, usuario, ubicacion, nivel, especialidad };
  localStorage.setItem("perfilUsuario", JSON.stringify(datos));

  // Mostrar en vista
  mostrarPerfil();
});

function mostrarPerfil() {
  const datos = JSON.parse(localStorage.getItem("perfilUsuario"));
  if (datos) {
    document.getElementById("vistaNombre").textContent = `Nombre: ${datos.nombre}`;
    document.getElementById("vistaUsuario").textContent = `Usuario: ${datos.usuario}`;
    document.getElementById("vistaUbicacion").textContent = `Ubicación: ${datos.ubicacion}`;
    document.getElementById("vistaNivel").textContent = `Nivel: ${datos.nivel}`;
    document.getElementById("vistaEspecialidad").textContent = `Especialidad: ${datos.especialidad}`;
  }
}

// Mostrar datos guardados al cargar
mostrarPerfil();
