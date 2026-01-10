import express from "express";
import cors from "cors";
// import bodyParser from 'express'
import mongoose from "mongoose";
// import dotenv from "dotenv";
import {config} from "dotenv"
import userRouter from "./routes/user.js";

config({ path: ".env" });


const app = express();

app.use(cors())
  







app.use(express.json());


app.use("/api/user", userRouter);

console.log("MONGO_URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));


const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

