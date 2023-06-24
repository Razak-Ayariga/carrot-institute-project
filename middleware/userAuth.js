import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//check if user already exist
const findUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await users.findOne({
      where: { email: email },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists. Please login!" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

//log in token
const UserToken = async (req, res, next) => {
  const userInfo = req.body;
  const findUser = await users.findOne({
    where: { email: userInfo.email }});
  if (!findUser) {
    res.status(403).json({ message: "Invalid email or password" });
    return;
  };
  const password = userInfo.password;
  const hashedpassword = findUser.dataValues.password;
 const passwordMatch = await bcrypt.compare(password, hashedpassword);
  if (!passwordMatch) return res.status(403).json({ message: "Invalid Email or password!" });

  const tokenVariables = {
    id: findUser.dataValues.id,
    full_name: findUser.dataValues.full_name_name,
    email: findUser.dataValues.email,
  }
  // Generate company login token
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
    const userInfo = decodedToken;
    if (userInfo) {
      req.user_id = userInfo.id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Failed to authenticate token!" });
  }
};

export { findUser, UserToken, verifyToken };