import connectDB from "./DB/connection.js"
import AuthRout from "./Modules/Auth/Auth.controller.js"
import UserRout from "./Modules/User/User.controller.js"

export default function Bootstrap(app,express)
{
   try 
   {
   app.use(express.json())
   app.use(express.static("Uploads"))
   connectDB()
   
   app.use("/Auth",AuthRout)
   app.use("/User",UserRout)
   app.use((err,req,res,next)=>
   {
    return res.status(err.cause || 500).json({message:err.message || "Server error"})
   })
   }
   catch(err)
   {
      console.log(err)
   }
}