import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

  



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://login-assignment-eight.vercel.app"
  ],
  credentials: true,
}));



app.use(express.json());


app.use("/api/user", userRouter);


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));


const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

