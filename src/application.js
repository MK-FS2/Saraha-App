import connectDB from "./DB/connection.js"
import AuthRout from "./Modules/Auth/Auth.controller.js"

export default function Bootstrap(app,express)
{
   try 
   {
   app.use(express.json())
   connectDB()
   
   app.use("/Auth",AuthRout)

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