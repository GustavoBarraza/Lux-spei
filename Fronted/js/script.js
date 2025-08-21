const API_KEY = "TU_API_KEY"; // tu API
const ciudad = "Barranquilla";

async function obtenerClima() {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ciudad}?unitGroup=metric&key=${API_KEY}&contentType=json`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Mostrar datos generales
    document.getElementById("ciudad").textContent = data["dirección resuelta"];
    document.getElementById("condiciones").textContent = data.description;
    document.getElementById("temp-actual").textContent = `Temp actual: ${data.días[0].temperatura}°C`;

    // Mostrar pronóstico por horas
    const contenedorHoras = document.getElementById("pronostico-horas");
    contenedorHoras.innerHTML = ""; // limpiar
    data.días[0].horas.forEach(h => {
      const span = document.createElement("span");
      span.textContent = `${h["fecha y hora"]}: ${h.temperatura}°C, ${h.condiciones}`;
      contenedorHoras.appendChild(span);
    });

  } catch (err) {
    console.error("Error obteniendo clima:", err);
  }
}

obtenerClima();

fetch("climaCompleto.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ciudad").textContent = data.ciudad;
    document.getElementById("condiciones").textContent = data.condiciones;
    document.getElementById("temp-actual").textContent = `Temp actual: ${data.temperatura_actual}°C`;

    const contenedorHoras = document.getElementById("pronostico-horas");
    data.pronostico_horas.forEach(h => {
      const span = document.createElement("span");
      span.textContent = `${h.hora}: ${h.temp}°C, ${h.condiciones}`;
      contenedorHoras.appendChild(span);
    });
  });
