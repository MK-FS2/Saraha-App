import UserModel from "../../DB/models/UserModel.js"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js"
import dotenv from "dotenv"
dotenv.config()

export const Update_User_Profile = async (req,res,next)=>
{
let {Fname,Lname,Phone,Password}= req.body 
// from the middleware named authentication
let User = req.User
const Updatedbody = {}
if(Fname)
{
    Updatedbody.Fname=Fname
}
if(Lname)
{
    Updatedbody.Lname=Lname
}
if(Phone)
{
    Updatedbody.Phone = CryptoJS.DES.encrypt(Phone,process.env.EncryptionKey).toString()
}
if(Password)
{
    Updatedbody.Password = bcrypt.hashSync(Password,10)
}
const Updated = await UserModel.findOneAndUpdate({_id:User._id},{$set:Updatedbody},{new:true})
return res.json({message:"Profile Updated succsesfully",Newdata:Updated})
}