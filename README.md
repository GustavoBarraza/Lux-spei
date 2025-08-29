**Esta es la documentacion base de backend**

modelo de carpetas:
```
backend/
│── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   └── jwt.js
│   └── index.js   
│
├── node_modules/
├── package.json
├── .env

--para levantar el servidor--

1 installa las dependencias npm i
2 para correr npm run dev


//crear archivo .env que tenga//:
PORT= 4000           <<el puerto>>
DB_HOST=localhost    <<el host de la base de datos>>
DB_USER=root         <<el usuario de la base de datos>>
DB_PASS=Qwe.123*     <<la contraseña de la base de datos>>
DB_NAME=OLYMPUS      <<el nombre de la base de datos>>
JWT_SECRET=asd123    <<este token le colocaras como tu quieras este es un ejemplo>>


endpoints:

//este enpoint es para autenticacion para register y login
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);