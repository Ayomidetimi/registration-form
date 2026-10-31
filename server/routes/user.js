import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({  
    username, 
    email, 
    password: hashedPassword
  });
  await newUser.save();
  res.status(201).json({ status: "success", message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }


  const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
  res.status(200).json({ status: "success", message: "Login successful", token });
});

export default router;