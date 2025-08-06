import Joi from "joi";


export const UpdateUserSchema = ()=>
{
const phonepattern = /^0\d{10}$/
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[\d@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const UpdateSchema = Joi.object({
Fname:Joi.string().min(2).max(10),
Lname:Joi.string().min(2).max(10),
Email:Joi.string().email().message("Invalid email"),
Phone:Joi.string().pattern(phonepattern).message("Phone number must start with 0 and be  11 digits."),
Password:Joi.string().pattern(passwordPattern).message("The password must be atlest 6 character and have sympols and numbers")
})
return UpdateSchema
}