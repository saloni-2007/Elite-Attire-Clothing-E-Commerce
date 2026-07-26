const User =require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");

async function register(req,res) {
    const data=req.body;
    const{name,email,password,address,contactNumber}=data;
    if(!name || !email ||!password  || !address || !contactNumber){
        return res
        .Status(400)
        .send({success:false,
            message:"Required Fields are missing"});
    }
    const userData = await User.findOne({email:email});
    if (userData){
        return res
        .status(400)
        .send({success:false,message:"Email already registered"});
    }
   const hashPassword=await  bcrypt.hash(password,10);
   const newUserData=new User({name,
    email,
    address,
    contactNumber,
    password:hashPassword,
});
   const newUser= await newUserData.save();
   return res.send({
    success:true,
    message:"Registered Successfully",
    data:newUser,
   });
}


async function login(req,res) {
    const data =req.body;
    const{email,password}=data;
    if(!email || !password){
        return res
        .status(400)
        .send({success:false,message:"all required fields Not found"});


    }
    const userData=await User.findOne({email: email});
    if(!userData){
        return res
        .status(400)
        .send({success:false,message:"email or password invalid"});
        
    }
    const hashPassword=userData.password;
    const isPasswordMatch=await bcrypt.compare(password,hashPassword);
    if(!isPasswordMatch){
        return res
        .status(400)
        .send({success:false,message:"email or password invalid"});
        
    }
    //generate JWT token

     const JWT_SECRET=process.env.JWT_SECRET;
    const token=jwt.sign({userId:userData._id},JWT_SECRET,{
        expiresIn:"7d",
    });
   
    //
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.MODE==="production",
        sameSite:process.env.MODE==="production"?"none":"lax",
        maxAge:7*24*60*60*1000,
    });
    return res.send({
        success:true,
        message:"login Successfully",
    });
}

async function getMe(req,res) {
    const user=req.user;
    if(!user){
    return res.status(404).send({success:false,message:"user not found"});
    }
    return res.send({success:true,data:user});
}

async function logout(req,res) {
    res.cookie("token","",{
        httpOnly:true,
        maxAge:0,
    });
    return res.send({
        success:true,
        message:"Logout Successfully",
    });
}

module.exports={register,login,getMe,logout};