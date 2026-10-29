import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";


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
  res.status(201).json({ message: "User created successfully" });
});

export default router;