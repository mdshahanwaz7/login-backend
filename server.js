import express  from "express"
// import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken'
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "express"
// import { signup } from "./controllers/user.js";
import userRouter from './routes/user.js'
// import { config} from 'dotenv'

const app=express()

app.use(bodyParser.json())
config({path:'.env'})
app.use(cors());
app.use(express.json());



try {
     mongoose.connect(
      process.env.MONGO_URL,
      {
        dbName: "complaint_resolver_system"
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }




  

app.use('/api/user',userRouter)

const port=process.env.PORT

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})