import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const signup = async (req, res, next) => {
  // get user details
  const { name, email, password } = req.body;
  // error if the details are null
  if (!name || !email || !password) {
    // return res.status(400).json({ msg: "Please enter all fields" });
    next(errorHandler(500, "enter all fields"));
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }
  // hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  // create user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  // save user
  try {
    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    // res.status(500).json({
    //   message: "user creation failed",
    // });
    next(errorHandler(500, "user creation failed"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(404, "enter all fields"));
  }
  try {
    // get login details
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    // check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "invalid password"));
    }
    const { password: pass, ...others } = validUser._doc;
    dotenv.config();
    // generate token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token",token, { httpOnly: true }).json({...others,token});
  } catch (error) {
    next(error);
  }
};
