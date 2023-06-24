import restaurants from "../models/restaurantModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const absolutePath = path.resolve("./");
const jwtSecret = process.env.JWT_SECRET;
dotenv.config();

//check if user already exist
const findRestaurant = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingRestaurant = await restaurants.findOne({ where: { email }});
    if (existingRestaurant) {
      res.status(403).json({ message: "User already exists. Please login!" });
      return;
    }
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//log in token
const restaurantToken = async (req, res, next) => {
  const restaurantInfo = req.body;
  const findRestaurant = await restaurants.findOne({
    where: { email: restaurantInfo.email }});
  if (!findRestaurant) {
    res.status(403).json({ message: "Invalid email or password" });
    return;
  };
  const password = restaurantInfo.password;
  const hashedpassword = findRestaurant.dataValues.password;
 const passwordMatch = await bcrypt.compare(password, hashedpassword);
  if (!passwordMatch) return res.status(403).json({ message: "Invalid Email or password!" });

  const tokenVariables = {
    id: findRestaurant.dataValues.id,
    name: findRestaurant.dataValues.name,
    email: findRestaurant.dataValues.email,
  }
  // Generate login token
  const token = jwt.sign(tokenVariables, jwtSecret, {expiresIn:"1hr"});
  req.token = token;
  next();
};

// Token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const restaurantInfo = decodedToken;
    if (restaurantInfo) {
      req.restaurant_id = restaurantInfo.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Failed to authenticate token!" });
  }
};

//middleware to upload logo
const logoUpload = (destination) => {
  const directory = path.join(absolutePath, destination);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },
    filename: function (req, file, cb) {
      const filename =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {

    const { mimetype } = file;
    if (mimetype.includes("image")) {
      cb(null, true)
    } else {
      cb(new Error("Upload only images!"));
    }
    return;
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};

export { findRestaurant, restaurantToken, verifyToken, logoUpload };