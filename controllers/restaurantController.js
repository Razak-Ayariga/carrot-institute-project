import restaurants from "../models/restaurantModel.js";
import menuItem from "../models/menuModel.js";
import orders from "../models/ordersModel.js";
import bcrypt from "bcrypt";

// sign up
const restaurantSignUp = async (req, res) => {
    try {
        const newRestaurant = req.body;
        const password = newRestaurant.password;
        const hashPassword = await bcrypt.hash(password, 10);
        const logo = req.file?.filename;
         newRestaurant["logo"] = logo;
        newRestaurant["password"] = hashPassword;
        
        const addRestaurant = await restaurants.create(newRestaurant);
        if (addRestaurant) res.status(201).json({ message: "SignUp successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SignUp failed!" });
    }
};

// login
const restaurantSignIn = async (req, res) => {
    try {
        const token = req.token;
        const restaurantInfo = req.body;
        if (restaurantInfo) {
            res.status(200).json({ message: "Login successful!", token});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error login!"})
    }
};
//all restaurants
const getAllRestaurants= async (req, res) => {
  try {
    const restaurant_id = req.params.restaurant_id;
    const findRestaurant = await restaurants.findAll({
      where: { restaurant_id: restaurant_id },
    });
    if (findRestaurant) {
      return res.status(200).json(findRestaurant);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting restaurants" });
  }
};

//get all restaurant information
const allInformation = async (req, res) => {
    try {
        const restaurant_id = req.restaurant_id;
        const restaurantInfo = await restaurants.findAll({
            where: { restaurant_id: restaurant_id },
            include: [
                {
                    model: menuItem,
                    required: true
                }
            ]
        });
        if (restaurantInfo) {
            return res.status(200).json(restaurantInfo);
        }
    } catch (error) {
        console.log(error);
        res.satus(500).jso({ messgae: "error" });
    }
};

// view all orders
const getAllOrders = async (req, res) => {
    try {
        const restaurant_id = req.restaurant_id;
        const findAllOrders = await restaurants.findAll({
            where: { id: restaurant_id },
            include: [
                {
                    model: orders,
                    required: false
                }
            ]
    });
    if (!findAllOrders) {
      return res.status(400).json("No orders available!");
    }
    res.status(200).json(findAllOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can not get all orders!" });
  }
};

export {
    restaurantSignUp,
    restaurantSignIn,
    getAllRestaurants,
    allInformation,
    getAllOrders
};