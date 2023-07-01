import express from "express";
import {
     placeOrder, 
    updateOrder, 
    getAllUserOrders, 
    oneOrder,
    cancelOrder
} from "../controllers/ordersController.js";

import { verifyToken } from "../middleware/userAuth.js";

const router = express.Router();
router.post("/order", verifyToken, placeOrder);
router.put("/updateOrder/:id", verifyToken, updateOrder);
router.get("/allOrders", getAllUserOrders);
router.get("/oneOder/:id", oneOrder);
router.delete("/cancelOrder/:id", verifyToken, cancelOrder);

export default router;