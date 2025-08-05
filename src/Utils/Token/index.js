import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()

export const SignToken=(Payload,ExpireTime = "7d")=>{
    try 
    {
     const Token = jwt.sign(Payload,process.env.TokenKey,{expiresIn:ExpireTime})
     return Token
    }
    catch(err)
    {
         console.log(err)
        return null
    }
}


export const VerifyToken = (Token)=>{
    try 
    {
    const DecodedToken = jwt.verify(Token,process.env.TokenKey)
    return DecodedToken
    }
    catch(err)
    {
        console.log(err)
        return null
    }
}