import pool from "../config/db.js"


export const getAllRoutes = async (req, res) => {
  try {
    const [rows] = await pool.query(`
            SELECT 
                r.id_route, 
                r.name, 
                r.description, 
                r.distance, 
                r.start_location, 
                r.end_location, 
                u.name AS user_name,
                c.latitude, 
                c.longitude, 
                c.point_order
            FROM routes r
            JOIN coordinates c ON r.id_route = c.id_route
            JOIN users u ON r.id_user = u.id_user
            ORDER BY r.id_route, c.point_order
        `);

    if (rows.length === 0) {
      return res.status(200).json({ success: true, routes: [] });
    }

    const routesMap = new Map();
    rows.forEach(row => {
      if (!routesMap.has(row.id_route)) {
        routesMap.set(row.id_route, {
          id_route: row.id_route,
          name: row.name,
          description: row.description,
          distance: row.distance,
          start_location: row.start_location,
          end_location: row.end_location,
          user_name: row.user_name,
          coordinates: []
        });
      }
      routesMap.get(row.id_route).coordinates.push({
        latitude: row.latitude,
        longitude: row.longitude,
        point_order: row.point_order
      });
    });

    const allRoutes = Array.from(routesMap.values());

    res.status(200).json({ success: true, routes: allRoutes });
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    res.status(500).json({ success: false, error: 'Error del servidor al obtener las rutas' });
  }
};


export const getRouteById = async (req, res) => {
  try {
    const routeId = Number(req.params.id);

    if (isNaN(routeId)) {
      return res.status(400).json({ error: "Invalid route ID" });
    }

    const [routes] = await pool.query(
      "SELECT * FROM routes WHERE id_route = ?",
      [routeId]
    );

    if (routes.length === 0) {
      return res.status(404).json({ message: "Route not found" });
    }

    const [coordinates] = await pool.query(
      "SELECT latitude, longitude, point_order FROM coordinates WHERE id_route = ? ORDER BY point_order ASC",
      [routeId]
    );

    res.json({ ...routes[0], coordinates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una nueva ruta con coordenadas
export const createRoute = async (req, res) => {
  const { name, description, distance, start_location, end_location, user_name, coordinates } = req.body;

  if (!name || !distance || !start_location || !end_location || !user_name || !coordinates || coordinates.length === 0) {
    return res.status(400).json({ success: false, error: 'Faltan datos de la ruta o están incompletos.' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Validar si el usuario existe y obtener su ID
    const [users] = await connection.execute('SELECT id_user FROM users WHERE name = ?', [user_name]);

    if (users.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, error: 'Usuario no encontrado.' });
    }

    const id_user = users[0].id_user;

    // 2. Insertar la ruta en la tabla 'routes'
    const [resultRoute] = await connection.execute(
      'INSERT INTO routes (name, description, distance, start_location, end_location, id_user) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, distance, start_location, end_location, id_user]
    );

    const routeId = resultRoute.insertId;

    // 3. Insertar las coordenadas en la tabla 'coordinates'
    const coordinateValues = coordinates.map(coord => [
      routeId,
      coord.latitude,
      coord.longitude,
      coord.point_order
    ]);

    await connection.query(
      'INSERT INTO coordinates (id_route, latitude, longitude, point_order) VALUES ?',
      [coordinateValues]
    );

    await connection.commit();

    res.status(201).json({ success: true, message: 'Ruta guardada con éxito', routeId: routeId });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error en la transacción del servidor:', error);
    res.status(500).json({ success: false, error: 'Error del servidor al guardar la ruta' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Controlador para actualizar una ruta
export const updateRoute = async (req, res) => {
  const { id } = req.params;
  const { name, description, distance, start_location, end_location, user_name, coordinates } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Obtener el ID del usuario
    const [users] = await connection.execute('SELECT id_user FROM users WHERE name = ?', [user_name]);
    if (users.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }
    const id_user = users[0].id_user;

    // 1. Actualiza los datos de la ruta principal
    const updateRouteQuery = `
            UPDATE routes SET 
            name = ?, 
            description = ?, 
            distance = ?, 
            start_location = ?, 
            end_location = ?, 
            id_user = ?
            WHERE id_route = ?
        `;
    const [updateResult] = await connection.execute(updateRouteQuery, [name, description, distance, start_location, end_location, id_user, id]);

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Ruta no encontrada para actualizar.' });
    }

    // 2. Elimina las coordenadas antiguas de la ruta
    const deleteCoordsQuery = 'DELETE FROM coordinates WHERE id_route = ?';
    await connection.execute(deleteCoordsQuery, [id]);

    // 3. Inserta las nuevas coordenadas
    const coordinateValues = coordinates.map(coord => [
      id,
      coord.latitude,
      coord.longitude,
      coord.point_order
    ]);
    const insertCoordsQuery = 'INSERT INTO coordinates (id_route, latitude, longitude, point_order) VALUES ?';
    await connection.query(insertCoordsQuery, [coordinateValues]);

    await connection.commit();
    res.status(200).json({ success: true, message: 'Ruta actualizada con éxito.' });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error al actualizar la ruta:', err);
    res.status(500).json({ success: false, message: 'Error del servidor al actualizar la ruta.' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Elimina las coordenadas asociadas
    const deleteCoordsQuery = 'DELETE FROM coordinates WHERE id_route = ?';
    await connection.execute(deleteCoordsQuery, [id]);

    // 2. Elimina la ruta principal
    const deleteRouteQuery = 'DELETE FROM routes WHERE id_route = ?';
    const [deleteResult] = await connection.execute(deleteRouteQuery, [id]);

    if (deleteResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Ruta no encontrada.' });
    }

    await connection.commit();
    res.status(200).json({ success: true, message: 'Ruta eliminada con éxito.' });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error al eliminar la ruta:', err);
    res.status(500).json({ success: false, message: 'Error del servidor al eliminar la ruta.' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


