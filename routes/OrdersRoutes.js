import express from "express";
import { placeOrder, updateOrder, getAllUserOrders, cancelOrder } from "../controllers/ordersController.js";
import { verifyToken } from "../middleware/userAuth.js";

const router = express.Router();
router.post("/order", verifyToken, placeOrder);
router.put("/updateOrder/:id", verifyToken, updateOrder);
router.get("/allOrders", getAllUserOrders);
router.delete("/cancelOrder/:id", verifyToken, cancelOrder);

export default router;