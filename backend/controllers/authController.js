import User from "../models/User.js";
import { generateOTP } from '../utils/generateOTP.js';
import brypt from 'bcryptjs';
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { sendSms } from "../utils/sendSMS.js";



export const checkUser = async (req, res) => {
  const { email, phone } = req.body;

  let user;

  if (email) {
    user = await User.findOne({ email });
    
  }
 else if (phone) {
    user = await User.findOne({ phone });
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
res.json({
      message: "User exists",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });

};





// Register user with email + phone, but OTP goes to phone
export const registerPhone = async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check if user with this email or phone already exists
  let user = await User.findOne({ $or: [{ email }, { phone }] });

  // If user exists but NOT verified → resend OTP
  if (user && !user.isVerified) {
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send OTP to phone only
    await sendSms(phone, `Your OTP is ${otp}. It will expire in 5 minutes`);
    return res.json({ message: "OTP resent successfully to phone" });
  }

  // User exists and verified → block registration
  if (user && user.isVerified) {
    return res.status(400).json({ message: "Email or phone already registered" });
  }

  // New user → create and send OTP
  const otp = generateOTP();
  user = await User.create({
    name,
    email,
    phone,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000
  });

  // Send OTP to phone only
  await sendSms(phone, `Your OTP is ${otp}. It will expire in 5 minutes`);

  res.json({ message: "OTP sent successfully to phone" });
};



export const registerEmail=async (req,res)=>{
   try{
     const {name,email,phone}=req.body;

    let user=await User.findOne({
        $or:[{email},{phone}]
    });

  // 🟢 If user exists but NOT verified → resend OTP
if(user&&!user.isVerified){
    const otp = generateOTP();
     user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();
      await sendEmail(email, otp);
    return res.json({ message: "OTP resent successfully" });
}

//if user already exist and verified block
if(user&&user.isVerified){
    return res
      .status(400)
      .json({ message: "Email or Phone already registered" });
}
//new user case
const otp = generateOTP();
 user=await User.create({
    name,
    email,
    phone,
    otp,
    otpExpiry:Date.now()+5*60*1000
});
await sendEmail(email, otp);
res.json({message:"OTP sent successfully",email});
   }catch(err){
    console.log(err);
   }
}

export const verifyOtp=async(req,res)=>{
    const {email, otp}=req.body;
    // console.log(req.body);
    
    const user=await User.findOne({email});
    
    // if(!user||user.otp!==otp||user.otpExpiry<Date.now())
    //     return res.status(400).json({message:"Invalid or expired otp"});
    if (!user || String(user.otp) !== String(otp))
    return res.status(400).json({ message: "Invalid or expired otp" });
user.otp=null;
await user.save();

res.json({
  user: {
    name: user.name,
    email: user.email,
    phone: user.phone
  }
});
}

export const setPassword=async(req,res)=>{
const {email,password}=req.body;
const user=await User.findOne({email});

if (!user) {
  return res.status(404).json({ message: "User not found" });
}

const hashed =await brypt.hash(password,10);

user.password=hashed;
user.isVerified=true;
await user.save();

res.json({message:"Password set successfully",
  user:{
    name:user.name,
    email:user.email,
    phone:user.phone
  }}
);
}



export const loginEmailOtp=async(req,res)=>{
    const {email}=req.body;
const user=await User.findOne({email});
if (!user)
    return res.status(400).json({ message: "User not found" });
const otp=generateOTP();
user.otp=otp;
user.otpExpiry=Date.now()+5*60*1000;
await user.save();
await sendEmail(email, otp);
res.json({message:"OTP sent to email"});
}

export const verifyEmailOtp=async(req,res)=>{
    const {email,otp}=req.body;
      const user = await User.findOne({ email });

    if(user.otp!==otp||user.otpExpiry<Date.now())
        return res.status(400).json({message:"Invalid otp or Expired otp"})

    user.otp=null;
    await user.save();
    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    res.json({
  token,
  user: {
    name: user.name,
    email: user.email,
    phone: user.phone
  }
});
} 

export const loginPhoneOtp=async(req,res)=>{
    const {phone}=req.body;
const user=await User.findOne({phone});
if (!user)
    return res.status(400).json({ message: "User not found" });
const otp=generateOTP();
user.otp=otp;
user.otpExpiry=Date.now()+5*60*1000;
await user.save();
await sendSms(
    phone,
    `Your OTP is ${otp}. It will expire in 5 minutes`
)
res.json({message:"OTP sent to phone",user:{
            email:user.email,
            phone:user.phone,
            name:user.name
          }});
}


export const verifyPhoneOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  if (
    user.otp !== otp ||
    user.otpExpiry < Date.now()
  )  {  return res.status(400).json({ message: "Invalid or expired OTP" });}


  user.otp = null;
  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

 res.json({token,
          user:{
            email:user.email,
            phone:user.phone,
            name:user.name
          }}
        );
};


export const loginPhonePassword=async(req,res)=>{
    const {phone,password}=req.body;

    const user=await User.findOne({phone});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
const isMatch=await brypt.compare(password,user.password);
if(!isMatch)
            return res.status(400).json({message:"Inavlid Password"});
        const token  =jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
       res.json({token,
          user:{
            email:user.email,
            phone:user.phone,
            name:user.name
          }}
        );
}

export const loginEmailPassword=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
const isMatch=await brypt.compare(password,user.password);
if(!isMatch)
            return res.status(400).json({message:"Inavlid Password"});
        const token  =jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({token,
          user:{
            email:user.email,
            phone:user.phone,
            name:user.name
          }}
        );
}
