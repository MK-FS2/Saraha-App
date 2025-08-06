import { Router } from "express";
import validatator from "../../Middleware/Validator/index.js"
import { UpdateUserSchema } from "./User_validation.js";
import ErrorHandler from "../../Utils/Error/index.js";
import { Authenticate } from "../../Middleware/Authenticate/index.js";
import { Update_User_Profile } from "./User.service.js";

const UserRout = Router()

UserRout.put("/Update",Authenticate,validatator(UpdateUserSchema()),ErrorHandler(Update_User_Profile))
export default UserRout