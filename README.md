Olympus

Welcome to OLYMPUS, a project that merges technology, community, and personal growth into a full-stack web platform. Here, every goal achieved and every path taken lights the way to a better world.

Description

Olympus is a web application that combines the best of a Node.js backend with a lightweight frontend built in HTML, CSS, and vanilla JS, designed to deliver an intuitive and powerful experience.

The Olympus module stands as the peak of the experience: a place where users can sign up, set goals, map routes, chat, and share achievements.

It’s more than just code.
It’s a land where motivation and community come together. 🌍⚡

Key Features
 JWT Authentication – Security at every step.

 Route management – Explore and create personalized paths.

 Goals and achievements – Set objectives and track your progress.

 Real-time chat – Connect with the community.

 User profile – Customize your experience.

 Structured database – SQL optimized for scalability.

Technologies Used
Backend (Lux Spei)

Node.js + Express.js

JWT for authentication

SQL database

RESTful controllers

Frontend (Olympus)

HTML5, CSS3, and vanilla JavaScript

Dynamic views (login, signup, dashboard, profile, goals, routes, chat)

Custom styles with a clean, modern design

 Project Structure
Lux-spei-main/
│
├── backend/               # Node.js + Express server
│   ├── src/controller     # Logic controllers
│   ├── src/routes         # API REST endpoints
│   ├── src/config         # Database configuration
│   ├── utils              # Utilities (JWT, middlewares)
│   └── Docs/Database.sql  # Database schema
│
├── olympus/               # Frontend
│   ├── src/views          # HTML views
│   ├── src/css            # CSS styles
│   ├── src/js             # Interaction scripts
│   └── Docs/imagenes      # Graphic resources
│
└── README.md              # This file

⚡ Installation & Usage
1. Clone the repository
git clone https://github.com/usuario/Lux-spei.git
cd Lux-spei-main

2. Configure the backend
cd backend
npm install


Set up your .env file with:

PORT=4000
DB_HOST=localhost
DB_USER=your_user
DB_PASS=your_password
DB_NAME=luxspei
JWT_SECRET=your_secret


Then start the server:

npm start

3. Configure the frontend
cd ../olympus
npm install   # (if applicable)


Open index.html in your browser to start the experience. 

 Contributions

Contributions are welcome!
You can open an issue or submit a pull request to help improve this project.

License

This project is under the MIT License.
You are free to use, modify, and expand it.
