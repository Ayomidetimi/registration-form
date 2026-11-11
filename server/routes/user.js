import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


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


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    // Avoid revealing whether an email is registered
    if (!user) {
      return res.status(200).json({
        status: "success",
        message: "If the account exists, a reset email will be sent."
      });
    }

    const resetToken = jwt.sign(
      {
        userId: user._id,
        purpose: "password-reset"
      },
      process.env.RESET_TOKEN_KEY,
      { expiresIn: "5m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink =
      `http://localhost:5173/resetPassword/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      text: `Click this link to reset your password: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: "success",
      message: "If the account exists, a reset email will be sent."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong"
    });
  }
});
export default router;