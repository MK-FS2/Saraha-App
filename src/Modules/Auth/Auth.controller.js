import { Router } from "express";
import validatator from "./../../Middleware/Validator/index.js"
import { NewPassword_validation, SignUP_validation } from "./AuthValidation.js";
import ErrorHandler from "./../../Utils/Error/index.js"
import { ForgetPassword, Login, NewPassword, RefreashToken, Resend, ResendCode, SignUp, VerfiyAccount } from "./Auth.service.js";
import { FileUpload } from "../../Middleware/UploadFiles/index.js";
const AuthRout = Router()

AuthRout.post("/SignUP",FileUpload("Profile_Photo").single("Profilepic"),validatator(SignUP_validation()),ErrorHandler(SignUp))
AuthRout.post("/VerifyEmail",ErrorHandler(VerfiyAccount))
AuthRout.post("/Resend",ErrorHandler(Resend))
AuthRout.post('/Login',ErrorHandler(Login))
AuthRout.post("/ForgetPassword",ErrorHandler(ForgetPassword))
AuthRout.put("/Resetpassword",validatator(NewPassword_validation()),ErrorHandler(NewPassword))
AuthRout.post("/ResendCode",ErrorHandler(ResendCode))
AuthRout.post("/RefreashToken",ErrorHandler(RefreashToken))
export default AuthRout