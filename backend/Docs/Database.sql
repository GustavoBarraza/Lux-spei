-- ==========================================
-- Crear Base de Datos
-- ==========================================
CREATE DATABASE OLYMPUS;
USE OLYMPUS;

-- ==========================================
-- Tabla de Usuarios
-- ==========================================
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



-- ==========================================
-- Tabla de Rutas
-- ==========================================
CREATE TABLE routes (
    id_route INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    distance DECIMAL(10,2),
    start_location VARCHAR(255),
    end_location VARCHAR(255),
    id_user INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_routes_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ==========================================
-- Tabla de Coordenadas de Rutas
-- ==========================================
CREATE TABLE coordinates (
    id_coordinate INT AUTO_INCREMENT PRIMARY KEY,
    id_route INT NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    point_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_coordinates_route FOREIGN KEY (id_route) REFERENCES routes(id_route)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ==========================================
-- Tabla de Actividades
-- ==========================================
CREATE TABLE activities (
    id_activity INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_route INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    duration INT,
    distance DECIMAL(10,2),
    calories_estimated INT,
    paces DECIMAL(5,2),
    notes VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activities_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_activities_route FOREIGN KEY (id_route) REFERENCES routes(id_route)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ==========================================
-- Tabla de Tipos de Logros
-- ==========================================
CREATE TABLE achievement_types (
    id_type_achievement INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- ==========================================
-- Tabla de Logros
-- ==========================================
CREATE TABLE achievements (
    id_achievement INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_type_achievement INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    icon VARCHAR(200),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_achievements_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_achievements_type FOREIGN KEY (id_type_achievement) REFERENCES achievement_types(id_type_achievement)
);

-- ==========================================
-- Tabla de Tipos de Metas
-- ==========================================
CREATE TABLE goal_types (
    id_goal_type INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- ==========================================
-- Tabla de Metas
-- ==========================================
CREATE TABLE goals (
    id_goal INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    target_distance DECIMAL(10,2),
    target_duration INT,
    target_date DATE,
    id_goal_type INT,
    status ENUM('pending', 'done', 'process') DEFAULT 'process',
    progress DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_goals_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_goals_type FOREIGN KEY (id_goal_type) REFERENCES goal_types(id_goal_type)
);

-- ==========================================
-- Tabla de Favoritos
-- ==========================================
CREATE TABLE favorites (
    id_favorite INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_route INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorites_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_favorites_route FOREIGN KEY (id_route) REFERENCES routes(id_route)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uk_favorites_user_route UNIQUE (id_user, id_route)
);

-- ==========================================
-- Tabla de Chats
-- ==========================================
CREATE TABLE chats (
    id_chat INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150), -- solo usado en grupos
    type ENUM('private', 'group') NOT NULL,
    id_user INT NOT NULL, -- creador
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_chats_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ==========================================
-- Tabla de Mensajes
-- ==========================================
CREATE TABLE messages (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    id_chat INT NOT NULL,
    id_user INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_chat FOREIGN KEY (id_chat) REFERENCES chats(id_chat)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_messages_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ==========================================
-- Tabla de Comentarios
-- ==========================================
CREATE TABLE comments (
    id_comment INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_route INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comments_route FOREIGN KEY (id_route) REFERENCES routes(id_route)
        ON DELETE CASCADE ON UPDATE CASCADE
);
