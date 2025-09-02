Olympus

Bienvenido a OLYMPUS, un proyecto que fusiona tecnología, comunidad y superación personal en una plataforma web full-stack.
Aquí, cada meta alcanzada y cada ruta recorrida iluminan el camino hacia un mundo mejor.

Descripción

Olympus es una aplicación web que combina lo mejor del backend en Node.js con un frontend ligero en HTML, CSS y JS vanilla, diseñada para ofrecer una experiencia intuitiva y potente.

El módulo Olympus funciona como la cima de la experiencia: un lugar donde los usuarios pueden registrarse, definir metas, trazar rutas, chatear y compartir logros.

Es más que código.
Es una tierra donde la motivación y la comunidad se encuentran.

Características principales
Autenticación con JWT – Seguridad en cada paso.

Gestión de rutas – Explora y crea caminos personalizados.

Metas y logros – Define objetivos y mide tu progreso.

Chat en tiempo real – Conecta con la comunidad.

Perfil de usuario – Personaliza tu experiencia.

Base de datos estructurada – SQL optimizado para escalabilidad.

Tecnologías utilizadas

Backend (Lux Spei)

Node.js + Express.js

JWT para autenticación

Base de datos SQL

Controladores RESTful

Frontend (Olympus)

HTML5, CSS3 y JavaScript vanilla

Vistas dinámicas (login, registro, dashboard, perfil, metas, rutas, chat)

Estilos personalizados con un diseño limpio y moderno

structura del proyecto

Lux-spei-main/
│
├── backend/               # Servidor con Node.js + Express
│   ├── src/controller     # Controladores de la lógica
│   ├── src/routes         # Endpoints API REST
│   ├── src/config         # Configuración de la DB
│   ├── utils              # Utilidades (JWT, middlewares)
│   └── Docs/Database.sql  # Modelo de base de datos
│
├── olympus/               # Frontend
│   ├── src/views          # Vistas HTML
│   ├── src/css            # Estilos CSS
│   ├── src/js             # Scripts de interacción
│   └── Docs/imagenes      # Recursos gráficos
│
└── README.md              # Este archivo

Instalación y uso

1. Clonar el repositorio

git clone https://github.com/usuario/Lux-spei.git
cd Lux-spei-main

2. Configurar el backend
cd backend
npm install


Configura tu archivo .env con:

PORT=4000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=luxspei
JWT_SECRET=tu_secreto


Luego inicia el servidor:

npm start

3. Configurar el frontend
cd ../olympus
npm install   # (si aplica)


Abre index.html en tu navegador para iniciar la experiencia.

Contribuciones

¡Las contribuciones son bienvenidas!
Puedes abrir un issue o enviar un pull request para mejorar este mundo.

Licencia

Este proyecto está bajo la licencia MIT.
Eres libre de usarlo, modificarlo y expandirlo.
