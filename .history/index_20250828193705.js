// src/index.js
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";
import messageRoutes from "./src/routes/messages.routes.js";
import routes from "./src/routes/route.routes.js"
<<<<<<< HEAD
import commentsRoutes from "./src/routes/comments.routes.js";
=======
>>>>>>> 9a7ccf2f40f4b6000c7b5b62b57abc84ef87a478
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/chats", chatRoutes);

app.use("/api/messages", messageRoutes)

app.use("/api", routes)

app.use("/api/comments", commentsRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` API corriendo en http://localhost:${PORT}`);
});

