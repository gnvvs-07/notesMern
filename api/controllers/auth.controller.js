import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  // get user details
  const { name, email, password } = req.body;
  // error if the details are null
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
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
    res.status(500).json({
      message: "user creation failed",
    });
  }
};
