import express from "express";
import { createMenu, updateMenu, cancelMenu, getAllMenu } from "../controllers/menuController.js";
import validateMenu from "../validators/menuVlidator.js";
import { verifyToken } from "../middleware/restaurantAuth.js";

const router = express.Router();
router.post("/addMenu", verifyToken, validateMenu, createMenu);
router.put("/updateMenu/:id", verifyToken, updateMenu);
router.delete("/cancelMenu/:id", verifyToken, cancelMenu);
router.get("/allMenu",verifyToken, getAllMenu);

export default router;
