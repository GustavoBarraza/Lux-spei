function showMessage(message) {
  const container = document.getElementById('message-container');
  container.innerHTML = `
                <div class="message-box">
                    <p>${message}</p>
                </div>
            `;
  setTimeout(() => {
    container.innerHTML = '';
  }, 1000); 
}

// Function to display a custom confirmation modal
function showConfirmModal(message, onConfirm) {
  const container = document.getElementById('confirm-modal-container');
  container.innerHTML = `
                <div class="confirm-modal">
                    <p>${message}</p>
                    <div class="flex justify-center gap-4 mt-4">
                        <button id="confirm-yes" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Sí, eliminar</button>
                        <button id="confirm-no" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                    </div>
                </div>
            `;

  document.getElementById('confirm-yes').onclick = () => {
    container.innerHTML = '';
    onConfirm(true);
  };

  document.getElementById('confirm-no').onclick = () => {
    container.innerHTML = '';
    onConfirm(false);
  };
}

// Function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) / 1000; // Distance in kilometers
}

const map = L.map('map').setView([10.9685, -74.7813], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

let currentRoute = null;
let routeIdToUpdate = null; // Variable para la ruta a actualizar

const drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polyline: true,
    polygon: false,
    rectangle: false,
    circle: false,
    marker: false,
    circlemarker: false
  }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
  if (currentRoute) {
    drawnItems.removeLayer(currentRoute);
  }
  currentRoute = e.layer;
  drawnItems.addLayer(currentRoute);
  routeIdToUpdate = null; // Clear update mode on new draw
  document.getElementById('save-route').textContent = 'Guardar Ruta';
});

// Sidebar functionality
const toggleButton = document.getElementById('toggle-sidebar');
const mainContent = document.getElementById('main-content');
const sidebar = document.getElementById('sidebar');
const sidebarContent = document.getElementById('sidebar-content');

toggleButton.addEventListener('click', () => {
  const isCollapsed = sidebar.classList.toggle('md:w-16');
  if (isCollapsed) {
    mainContent.classList.remove('md:grid-cols-[250px_1fr]');
    mainContent.classList.add('md:grid-cols-[64px_1fr]');
    sidebarContent.classList.add('hidden'); // Ocultar el contenido
  } else {
    mainContent.classList.add('md:grid-cols-[250px_1fr]');
    mainContent.classList.remove('md:grid-cols-[64px_1fr]');
    sidebarContent.classList.remove('hidden'); // Mostrar el contenido
  }
  setTimeout(() => map.invalidateSize(), 300);
  toggleButton.innerHTML = isCollapsed ? '<i class="fa-solid fa-angle-right"></i>' : '<i class="fa-solid fa-angle-left"></i>';
});

// Save and load route functionality
document.getElementById('save-route').addEventListener('click', async () => {
  const user_name = document.getElementById('user-name').value.trim();
  const routeDescription = document.getElementById('route-description').value.trim();

  if (!currentRoute) {
    showMessage('Por favor, traza una ruta en el mapa primero.');
    return;
  }

  if (!user_name) {
    showMessage('Completa el nombre de usuario.');
    return;
  }

  if (!routeDescription) {
    showMessage('Por favor, añade una descripción a la ruta.');
    return;
  }

  const coordinates = currentRoute.getLatLngs().map((c, index) => ({
    latitude: c.lat,
    longitude: c.lng,
    point_order: index
  }));

  if (coordinates.length < 2) {
    showMessage('La ruta debe tener al menos dos puntos.');
    return;
  }

  const startPoint = coordinates[0];
  const endPoint = coordinates[coordinates.length - 1];

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += calculateDistance(
      coordinates[i].latitude,
      coordinates[i].longitude,
      coordinates[i + 1].latitude,
      coordinates[i + 1].longitude
    );
  }
  const distance = totalDistance;

  const routeData = {
    name: `Ruta de ${user_name}`,
    description: routeDescription,
    distance: distance.toFixed(2),
    start_location: `${startPoint.latitude.toFixed(4)}, ${startPoint.longitude.toFixed(4)}`,
    end_location: `${endPoint.latitude.toFixed(4)}, ${endPoint.longitude.toFixed(4)}`,
    user_name: user_name,
    coordinates: coordinates
  };

  let url = 'http://localhost:4000/api/routes';
  let method = 'POST';
  if (routeIdToUpdate) {
    url += `/${routeIdToUpdate}`;
    method = 'PUT';
  }

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(routeData)
    });

    const data = await res.json();
    if (res.ok) {
      showMessage(routeIdToUpdate ? '¡Ruta actualizada exitosamente!' : '¡Ruta guardada exitosamente!');
      routeIdToUpdate = null; // Reset
      document.getElementById('save-route').textContent = 'Guardar Ruta';
      document.getElementById('user-name').value = '';
      document.getElementById('route-description').value = '';
      drawnItems.clearLayers();
      currentRoute = null;
      fetchAndDisplayRoutes(); // Reload routes
    } else {
      showMessage(`Error: ${data.message || data.error || 'Error al guardar/actualizar la ruta'}`);
    }
  } catch (err) {
    console.error(err);
    showMessage('Error al conectar con el servidor.');
  }
});

// Function to fetch and display all routes in the sidebar
async function fetchAndDisplayRoutes() {
  const sidebarContent = document.getElementById('sidebar-content');
  sidebarContent.innerHTML = '';
  try {
    const res = await fetch('http://localhost:4000/api/routes');
    if (!res.ok) {
      throw new Error('Error al cargar las rutas');
    }

    const data = await res.json();
    const routes = data.routes || [];

    if (routes.length === 0) {
      sidebarContent.innerHTML = '<p class="text-center text-gray-500 mt-4">No hay rutas guardadas.</p>';
      return;
    }

    routes.forEach(route => {
      let difficulty = 'Fácil';
      let difficultyClass = 'easy';
      if (route.distance > 2 && route.distance <= 10) {
        difficulty = 'Media';
        difficultyClass = 'medium';
      } else if (route.distance > 10) {
        difficulty = 'Difícil';
        difficultyClass = 'hard';
      }

      const div = document.createElement('div');
      div.className = 'bg-white p-2 mb-2 rounded-lg flex flex-col gap-2 shadow-sm cursor-pointer hover:bg-gray-200 transition-colors';
      div.dataset.id = route.id_route;
      div.innerHTML = `
                        <div class="flex items-center gap-2">
                            <img src="../../Docs/imagenes/placeholder_3446269.webp" alt="" class="w-20 h-15 rounded-md object-cover">
                            <div class="flex-1">
                                <p class="font-semibold text-sm">${route.description}</p>
                                <p class="text-xs text-gray-500">Distancia: ${route.distance} km</p>
                            </div>
                            <span class="difficulty-badge ${difficultyClass}">${difficulty}</span>
                        </div>
                        <div class="route-actions self-end flex gap-2">
                            <button class="edit-route" data-id="${route.id_route}" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="delete-route" data-id="${route.id_route}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    `;
      sidebarContent.appendChild(div);
    });

    // Add click event to display route on the map and for actions
    sidebarContent.querySelectorAll('.bg-white').forEach(card => {
      card.addEventListener('click', async (e) => {
        const routeId = e.currentTarget.dataset.id;
        if (!routeId) return;

        try {
          const routeRes = await fetch(`http://localhost:4000/api/routes/${routeId}`);
          if (!routeRes.ok) throw new Error('Ruta no encontrada');
          const routeData = await routeRes.json();

          // Clear map of previous routes
          drawnItems.clearLayers();

          // Draw the new route
          if (routeData.coordinates && routeData.coordinates.length > 0) {
            const latlngs = routeData.coordinates.map(c => [c.latitude, c.longitude]);
            currentRoute = L.polyline(latlngs, { color: '#0000ff' }).addTo(drawnItems);
            map.fitBounds(currentRoute.getBounds());
            showMessage(`Cargando ruta: ${routeData.description}`);
          } else {
            showMessage('Esta ruta no tiene coordenadas.');
          }

        } catch (err) {
          console.error('Error al cargar la ruta:', err);
          showMessage('Error al cargar la ruta seleccionada.');
        }
      });
    });

    // Add event listeners for new action buttons
    document.querySelectorAll('.delete-route').forEach(button => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent card click event
        const routeId = e.currentTarget.dataset.id;
        showConfirmModal('¿Estás seguro de que quieres eliminar esta ruta?', async (confirmed) => {
          if (confirmed) {
            try {
              const res = await fetch(`http://localhost:4000/api/routes/${routeId}`, {
                method: 'DELETE'
              });

              if (res.ok) {
                showMessage('Ruta eliminada exitosamente.');
                fetchAndDisplayRoutes();
              } else {
                const data = await res.json();
                showMessage(`Error al eliminar la ruta: ${data.message}`);
              }
            } catch (err) {
              console.error('Error al eliminar la ruta:', err);
              showMessage('Error al conectar con el servidor.');
            }
          }
        });
      });
    });

    document.querySelectorAll('.edit-route').forEach(button => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation(); // Prevent card click event
        const routeId = e.currentTarget.dataset.id;
        try {
          const res = await fetch(`http://localhost:4000/api/routes/${routeId}`);
          if (!res.ok) throw new Error('Ruta no encontrada');
          const routeData = await res.json();

          // Populate form fields
          // Check for both 'user_name' and a potential fallback 'name' from the database
          const userNameFromData = routeData.user_name || routeData.name;
          let cleanUserName = '';
          if (userNameFromData) {
            // Strip the "Ruta de " prefix if it exists
            if (userNameFromData.startsWith('Ruta de ')) {
              cleanUserName = userNameFromData.substring('Ruta de '.length);
            } else {
              cleanUserName = userNameFromData;
            }
            document.getElementById('user-name').value = cleanUserName;
          } else {
            console.error('La propiedad user_name o name no se encontró en los datos de la ruta.');
            document.getElementById('user-name').value = '';
            showMessage('Advertencia: El nombre de usuario no se pudo cargar.');
          }

          document.getElementById('route-description').value = routeData.description;

          // Set the ID for the update operation
          routeIdToUpdate = routeId;
          document.getElementById('save-route').textContent = 'Actualizar Ruta';

          // Clear existing route and draw the one to be edited
          drawnItems.clearLayers();
          if (routeData.coordinates && routeData.coordinates.length > 0) {
            const latlngs = routeData.coordinates.map(c => [c.latitude, c.longitude]);
            currentRoute = L.polyline(latlngs, { color: '#0000ff' }).addTo(drawnItems);
            map.fitBounds(currentRoute.getBounds());
          } else {
            showMessage('Esta ruta no tiene coordenadas para editar.');
            currentRoute = null;
          }

          showMessage(`Preparado para editar la ruta: ${routeData.description}`);
        } catch (err) {
          console.error('Error al cargar la ruta para editar:', err);
          showMessage('Error al cargar los datos de la ruta seleccionada.');
        }
      });
    });

  } catch (err) {
    console.error(err);
    showMessage('Error al cargar las rutas existentes.');
  }
}

// Load routes on startup
window.onload = fetchAndDisplayRoutes;