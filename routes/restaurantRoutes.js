import express from "express";
import {
    restaurantSignUp,
    restaurantSignIn,
    getAllRestaurants,
    getAllOrders,
    allInformation
} from "../controllers/restaurantController.js";

import {
    signUpValidator,
    signInValidator
} from "../validators/restaurantValidator.js";

import {
    findRestaurant,
    restaurantToken,
    verifyToken,
    logoUpload
} from "../middleware/restaurantAuth.js";

const router = express.Router();

router.post("/signUp",
logoUpload("public/logos").single("logo"),
findRestaurant,
signUpValidator,
restaurantSignUp,
);

router.post("/signIn",
    logoUpload("").none(""),
    signInValidator,
    restaurantToken,
    restaurantSignIn
);

router.get("/allRestaurants", getAllRestaurants);
router.get("/allOrders",verifyToken, getAllOrders);
router.get("allInfo",verifyToken, allInformation);

export default router;