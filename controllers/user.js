import {User} from '../model/user.js'
import bcrypt from 'bcryptjs'

export const signup=async(req,res)=>{
    const {name,email}=req.body;
    const password = String(req.body.password)
    if(name==""||email==""||password=="")

      

        return res.json({message:"all field are required"})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
console.log(req.body)
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}

 const passwordRegex =/^\d{4,}$/;
      

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 4 characters ",
      });
    }

    let user= await User.findOne({email})
    console.log(user)
    if(user)
        return res.json({message:"user already exist"})
    const hash=await bcrypt.hash(password,10)
    user=await User.create({name,email,password:hash})
    console.log(user)
    res.json({message:"user created succesfully"},user)

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
