import express from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/user.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

mongoose.connect('mongodb://localhost:27017/authenticaton')
const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", routes);

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});