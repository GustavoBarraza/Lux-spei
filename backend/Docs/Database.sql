-- ==========================================
-- Create database
-- ==========================================
CREATE DATABASE OLYMPUS;
USE OLYMPUS;

-- ==========================================
-- table user
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
-- Table of routes
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
-- Table coordinates
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
-- Table of goal type
-- ==========================================
CREATE TABLE goal_types (
    id_goal_type INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- ==========================================
-- Table of goal
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
-- Table of chats
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
-- Table of message 
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
-- Table of comments
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
