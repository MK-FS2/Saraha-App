import UserModel from "../DB/models/UserModel.js";
async function Delete_unVerified() 
{
 try 
 {
  // i see the current time relative to 30 days ago 
  let DeadTime = new Date(Date.now()-30*24*60*60*1000)
  const DeletOUTCOME = await UserModel.deleteMany({isVerified:false,ExpireAt:{$lte:DeadTime}})
 }   
 catch(err)
 {
    console.log(err)
 }
}

export function AutoDelete()
{
   Delete_unVerified()
   setInterval(Delete_unVerified,24*60*60*1000)
}