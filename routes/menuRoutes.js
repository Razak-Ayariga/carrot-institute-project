import express from "express";
import { createMenu, updateMenu, cancelMenu, getAllMenu, oneMenu } from "../controllers/menuController.js";
import validateMenu from "../validators/menuVlidator.js";
import { verifyToken, logoUpload } from "../middleware/restaurantAuth.js";

const router = express.Router();
router.post("/addMenu",logoUpload("").none(""), verifyToken, validateMenu, createMenu);
router.put("/updateMenu/:id", logoUpload("").none(""),verifyToken, updateMenu);
router.delete("/deleteMenu/:id", verifyToken, cancelMenu);
router.get("/oneMenu/:id", verifyToken, oneMenu);
router.get("/allMenu",verifyToken, getAllMenu);

export default router;
