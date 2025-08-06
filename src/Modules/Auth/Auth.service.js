import UserModel from "../../DB/models/UserModel.js"
import bcrypt from "bcrypt"
import sendMail from "../../Utils/Mail/index.js"
import crypt from "crypto-js"
import dotenv from "dotenv"
import { SignToken, VerifyToken } from "../../Utils/Token/index.js"
import {nanoid} from "nanoid"
dotenv.config()


export const SignUp = async (req, res) => {
  const { Fname, Lname, Phone, Email, Password } = req.body;

  const NewOTP = Math.floor(10000 + Math.random() * 90000);
  const Expire = 10 * 60 * 1000; 

  const NewUser = new UserModel({
    Fname: Fname,
    Lname: Lname,
    Phone: crypt.DES.encrypt(Phone, process.env.EncryptionKey),
    Email: Email,
    Password: bcrypt.hashSync(Password, 10),
    OTP: NewOTP,
    OTP_Expire: new Date(Date.now() + Expire),
    isfromgoogle: false,
    Profilepic: `${process.env.FileHandler}${req.file.path}` 
  });

  await NewUser.save();
  const Outcome = await sendMail(Email, NewOTP, Expire);
  if(!Outcome)
  {
    throw new Error("Server error acn send otp",{cause:500})
  }
  return res.status(201).json({ Message: "User Added successfully" });
};

export const VerfiyAccount = async (req,res)=>
{
let {Email,OTP} = req.body

const Unverifyed_user = await UserModel.findOne({Email,OTP})

if(!Unverifyed_user)
{
    throw new Error("Not found",{cause:401})
}

if(new Date(Unverifyed_user.OTP_Expire) < new Date())
{
    throw new Error("OTP expired")
}

await UserModel.findOneAndUpdate({ Email, OTP }, { $unset: { OTP: "", OTP_Expire: "" }, $set: { isVerified: true } });
return res.json({message:"Veriyfied"})
}

export const Resend = async (req,res)=>
{
let {Email} = req.body

 const NewOTP = Math.floor(10000 + Math.random() * 90000);
 const Expire = 5 * 60 * 1000;

 const User = await UserModel.findOneAndUpdate({Email},{$set:{OTP:NewOTP,OTP_Expire:new Date(Date.now() + Expire)}})

 if(!User)
 {
    throw new Error("user not found",{cause:401})
 }
 
 const Outcome = await sendMail(Email, NewOTP, Expire);
 if(!Outcome)
 {
    throw new Error("Server error acn send otp",{cause:500})
 }
 return res.json({ Message: "Code sent" });
}

export const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const User = await UserModel.findOne({ Email, isVerified: true });
  if (!User) 
  {
    throw new Error("Invalid credentials", { cause: 401 });
  }

  const PasswordOutcome = bcrypt.compareSync(Password,User.Password);
  if (!PasswordOutcome)
  {
    throw new Error("Invalid credentials", { cause: 401 });
  }

  const payload = 
  {
    id: User._id,
    FullName: `${User.Fname} ${User.Lname}`,
    Email: User.Email,
  };

  const ExpireTime = "3h";
  const TokenOutcome = SignToken(payload, ExpireTime);
  const RefreashToken = SignToken(payload,"1w")
  if (!TokenOutcome) 
  {
    throw new Error("Server error");
  }
 if(!RefreashToken)
 {
  throw new Error("Server Error")
 }
  return res.json({ Token: TokenOutcome ,RefreashToken});
};

export const ForgetPassword = async (req, res) => {
  const { Email } = req.body;

  const User = await UserModel.findOne({ Email,isVerified:true });

  if (!User) {
    throw new Error("Email not found", { cause: 401 });
  }

  const PassOTP = nanoid(6); 
  const Expire = 5 * 60 * 1000; 

  const SendOutcome = sendMail(Email, PassOTP, Expire);
  if (!SendOutcome) 
  {
    throw new Error("Server error");
  }
  User.Passwcode = PassOTP;
  User.passcodetime = new Date(Date.now() + Expire); 
  await User.save(); 
  return res.json({ message: "Code sent to your email" });
};

export const NewPassword = async (req,res)=>
{
let {Email,NewPassword,Code}= req.body

const User = await UserModel.findOne({Email,isVerified:true})
if(!User)
{
  throw new Error("Invalid credntials",{cause:401})
}
if(new Date() > new Date(User.passcodetime))
{
  throw new Error ("Code expired")
}
if(User.Passwcode != Code)
{
  throw new Error("Invalied code ")
}
if(bcrypt.compareSync(User.Password,NewPassword))
{
 throw new Error("New password can be the same as old one",{cause:400})
}
const converted = bcrypt.hashSync(NewPassword,10)

User.Password = converted 
User.passcodetime= undefined
User.Passwcode= undefined
await User.save()
return res.json({message:"password updated succsessfully"})
}

export const ResendCode = async (req,res)=>{
  let {Email} = req.body 

  const User = await UserModel.findOne({Email,isVerified:true})

  if(!User)
  {
    throw new Error("Invalid credntials",{cause:401})
  }
  const PassOTP = nanoid(6); 
  const Expire = 5 * 60 * 1000; 
  const SendOutcome = await sendMail(Email,PassOTP,Expire)
  if(!SendOutcome)
  {
    throw new Error("Server Error")
  }
  User.Passwcode = PassOTP;
  User.passcodetime = new Date(Date.now() + Expire); 
  return res.json({message:"Code set"})
}

export const RefreashToken = async (req,res)=>{
  let {authorization} = req.headers 
   let auth = authorization.split(" ")[1]
  const Decoded = VerifyToken(auth)
   if(!Decoded)
   {
    throw new Error("Invalid refreash log in again",{cause:401})
   }
   const newpayload = 
   {
    id:Decoded.id,
    FullName:Decoded.FullName,
    Email:Decoded.Email
   }
   const NewToken = SignToken(newpayload,"3h")
   const newrefreshToken = SignToken(newpayload,"1w")
   return res.json({Token:NewToken,RefreashToken:newrefreshToken})
}