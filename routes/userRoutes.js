import express from "express";
import { userSignUp, userSignIn, getAllUserOrders, getAllMenu} from "../controllers/userController.js";
import { signUpValidator, signInValidator } from "../validators/userValidator.js";
import { findUser, UserToken, verifyToken } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signUp",findUser, signUpValidator, userSignUp);
router.post("/signIn", signInValidator, UserToken, userSignIn);
router.get("/allOrders", verifyToken, getAllUserOrders);
router.get("/allMenu", getAllMenu);

export default router;