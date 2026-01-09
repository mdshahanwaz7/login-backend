import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true,
    },
     password:{
        type:String,
        required:true,
        
    },
    CreatedAt:{type:Date,default:Date.now
    },
})
const User=mongoose.model("login",userSchema)
export {User}