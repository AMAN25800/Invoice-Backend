import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import userData from '../Model/userSchema.js';
dotenv.config();
const createToken=(user)=>{

    if(!process.env.JWT_SECRET){
        throw new Error("secret key is not defined");
    }
 return  jwt.sign({
    id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    componyName:user.componyName,
    

    },
    process.env.JWT_SECRET,
   { expiresIn:'1h'}

)
}
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userData.findOne({email});
        if(!user){
            res.status(201).json({success:false,message:'user does not exist'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(404).json({success:false,message:'Incorrect email or password'});
        }
        const token=createToken(user);
        res.status(201).json({
            success:true,
            message:'Login Successful',
            token,
        })


    }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }


}
const registerUser=async(req,res)=>{
    const {name,componyName,phone,email,password}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try{
        const existingUser=await userData.findOne({email});
        if(existingUser){
            res.status(400).json({success:false,message:'user already exist'});
        }
        if(!existingUser){
        const hashedPassword=await bcrypt.hash(password,10);
        const newuser=new userData({
            name,
            componyName,
            email,
            phone,
            password:hashedPassword
        })
      
        await newuser.save();
        res.status(201).json({success:true,message:'Signup Sucessful'})
    }
    }
    catch(error){
        console.log(error);
        res.status(602).json({success:false,error});
    }

}


export {registerUser,loginUser};