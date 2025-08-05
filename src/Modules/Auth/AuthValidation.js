import Joi from "joi";



export const SignUP_validation = ()=>
{
const phonepattern = /^0\d{10}$/
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[\d@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const SignUp_Schema = Joi.object({
Fname:Joi.string().required().min(2).max(10),
Lname:Joi.string().required().min(2).max(10),
Email:Joi.string().required().email().message("Invalid email"),
Phone:Joi.string().required().pattern(phonepattern).message("Phone number must start with 0 and be  11 digits."),
Password:Joi.string().required().pattern(passwordPattern).message("The password must be atlest 6 character and have sympols and numbers")
})
return SignUp_Schema
}



export const NewPassword_validation = () => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[\d@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const NewSchema = Joi.object(
  {
  Email: Joi.string().email().required(),
  Code: Joi.string().required(),
  NewPassword: Joi.string().required().pattern(passwordPattern).message("Password must be at least 6 characters and include symbols and numbers")
  }
 );

  return NewSchema;
};