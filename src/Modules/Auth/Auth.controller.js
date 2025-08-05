import { Router } from "express";
import validatator from "./../../Middleware/Validator/index.js"
import { NewPassword_validation, SignUP_validation } from "./AuthValidation.js";
import ErrorHandler from "./../../Utils/Error/index.js"
import { ForgetPassword, Login, NewPassword, Resend, ResendCode, SignUp, VerfiyAccount } from "./Auth.service.js";
const AuthRout = Router()

AuthRout.post("/SignUP",validatator(SignUP_validation()),ErrorHandler(SignUp))
AuthRout.post("/VerifyEmail",ErrorHandler(VerfiyAccount))
AuthRout.post("/Resend",ErrorHandler(Resend))
AuthRout.post('/Login',ErrorHandler(Login))
AuthRout.post("/ForgetPassword",ErrorHandler(ForgetPassword))
AuthRout.put("/Resetpassword",validatator(NewPassword_validation()),ErrorHandler(NewPassword))
AuthRout.post("/ResendCode",ErrorHandler(ResendCode))
export default AuthRout