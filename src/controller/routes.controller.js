
import pool from "../config/db.js"


// Get all routes
export const getAllRoutes = async (req, res) => {
  try {
    const [routes] = await pool.query('SELECT * FROM routes');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get route by ID with coordinates
export const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [routes] = await pool.query('SELECT * FROM routes WHERE id_route = ?', [id]);
    if (routes.length === 0) return res.status(404).json({ message: 'Route not found' });

    const [coordinates] = await pool.query(
      'SELECT latitude, longitude, point_order FROM coordinates WHERE id_route = ? ORDER BY point_order ASC',
      [id]
    );

    res.json({ ...routes[0], coordinates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create route + coordinates
export const createRoute = async (req, res) => {
  const { name, description, distance, safety_rating, location, id_user, coordinates } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO routes 
      (name, description, distance, safety_rating, location, id_user)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, distance, safety_rating, location, id_user]
    );

    const id_route = result.insertId;

    // Insert coordinates if provided
    if (Array.isArray(coordinates)) {
      const coordValues = coordinates.map((c, idx) => [id_route, c.latitude, c.longitude, idx + 1]);
      await connection.query(
        `INSERT INTO coordinates (id_route, latitude, longitude, point_order) VALUES ?`,
        [coordValues]
      );
    }


    await connection.commit();
    res.status(201).json({ message: 'Route created', id_route });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// Update route (without coordinates for simplicity)
export const updateRoute = async (req, res) => {
  const { id } = req.params;
  const { name, description, distance, safety_rating, location } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE routes SET name=?, description=?, distance=?, safety_rating=?, location=? WHERE id_route=?`,
      [name, description, distance, safety_rating, location, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Route not found' });

    res.json({ message: 'Route updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete route (coordinates deleted by cascade)
export const deleteRoute = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM routes WHERE id_route = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Route not found' });

    res.json({ message: 'Route deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


