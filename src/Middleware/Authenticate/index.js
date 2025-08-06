import UserModel from "../../DB/models/UserModel.js";
import { VerifyToken } from "../../Utils/Token/index.js";

export async function Authenticate(req,res,next)
{
let { authorization } = req.headers;
// Cheakk if there is a token in the first place 
if(!authorization)
{
    throw new Error("Unauthourized",{cause:401})
}
// This return decoded token 
let Verfiyed = VerifyToken(authorization.split(" ")[1])
if(!Verfiyed)
{
    throw new Error("Unauthourized",{cause:401})
}
const User = await UserModel.findById(Verfiyed.id);
if(!User)
{
throw new Error("No user found",{cause:404})
}
req.User = User 
next()
}