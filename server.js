import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv  from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log("Server running"));
