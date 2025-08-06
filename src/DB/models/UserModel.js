import mongoose from "mongoose";


const User_Schema = mongoose.Schema(
{
 Fname:
 {
 type:String,
 required:true,
 min:2,
 max:10
 },
 Lname:
 {
   type:String,
   min:2,
   max:10
 },
 Email: 
 {
  type:String,
  required:true,
  unique:true,
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Enter valid email'],
  lowercase:true
 },
 Phone: 
 {
  type:String,
  required:true,
  unique:true
 },
 Password:
 {
  type:String,
  required:function()
  {
    if(this.isfromgoogle == true)
    {
      return false
    }
    else 
    {
       return true
    }
  }
 },
 isfromgoogle:
 {
    type:Boolean,
    required:true
 },
 OTP:
 {
    type:String
 },
 isVerified: 
 {
    type:Boolean,
    required:true,
    default:false
 },
 OTP_Expire:
 {
    type:Date
 },
 Passwcode:
 {
     type: String, 
   default:undefined
 },
 passcodetime:
 {
   type:Date,
   default:undefined
 },
 Profilepic:{
  type: String, 
  required:true,
 }
},
{
    timestamps: true,
    Collection:"Users" 
})


const UserModel =  mongoose.model('User',User_Schema)

export default UserModel