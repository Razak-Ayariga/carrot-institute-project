import users from "../models/userModel.js";
import orders from "../models/ordersModel.js";
import menuItem from "../models/menuModel.js";
import bcrypt from "bcrypt";

// sign up
const userSignUp = async (req, res) => {
    try {
        const newUser = req.body;
        const password = newUser.password;
        const hashPassword = await bcrypt.hash(password, 12);
        newUser["password"] = hashPassword;
        
        const addUser = await users.create(newUser);
        if (addUser) res.status(201).json({ message: "SignUp successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SignUp failed!" });
    }
};

// login
const userSignIn = async (req, res) => {
    try {
        const token = req.token;
        const userInfo = req.body;
        if (userInfo) {
            res.status(200).json({ message: "Login successful!", token});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error logging in!"})
    }
};

const getAllUserOrders= async (req, res) => {
  try {
    const id = req.user_id;
    const findAllOrders = await orders.findAll({
      where: { id: id },
    });
    if (findAllOrders) {
      return res.status(200).json(findAllOrders);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting orders" });
  }
};

//view all menu of a restaurant
const getAllMenu= async (req, res) => {
  try {
    // const id = req.restaurant_id;
    const findAllMenu = await menuItem.findAll();
    if (findAllMenu) {
      return res.status(200).json(findAllMenu);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting menu" });
  }
};

export { userSignUp, userSignIn, getAllUserOrders, getAllMenu };