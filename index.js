import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import sequelize from "./database/dbConfig.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import ordersRoutes from "./routes/OrdersRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const uploads = multer();

app.use("/restaurant", restaurantRoutes);
app.use("/restaurant", menuRoutes);
app.use("/user", userRoutes);
app.use("/user", ordersRoutes);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}