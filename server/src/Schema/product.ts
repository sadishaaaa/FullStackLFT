import Joi from "joi";
export const UserSchema = Joi.object({
  first_name: Joi.string().required().max(50).min(5).messages({
    "string.base": "first name is required",
    "string.empty": "first name cannot be empty",
    "string.required": "first name is required",
    "string.max": "first name should not exeed  50 charcter ",
    "string.min": "first name should  have atleast 5 charcter ",
  }),
  last_name: Joi.string().required().max(50).min(3).messages({
    "string.base": "last name is required",
    "string.empty": "last name cannot be empty",
    "string.required": "last name is required",
    "string.max": "last name should not exeed  50 charcter ",
    "string.min": "last name should  have atleast 5 charcter ",
  }),
  email: Joi.string().required().max(50).min(10).email().messages({
    "string.email": "Email must be a valid format",
    "string.empty": "Email cannot be empty",
    "string.required": "Email is required",
    "string.min": "Email should contain at least 10 characters",
    "string.max": "Email should not exceed 50 characters",
  }),
  password: Joi.string()
    .required()
    .min(5)
    .max(10)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
    .messages({
      "string.required": "Password is required",
      "string.min": "Password should have minimum 5 Character",
      "string.max": "Password should not exceed 10 Characters",
      "string.empty": "Paaword cannot be empty",
    }),
  address: Joi.string().required().max(50).messages({
    "string.base": "Address should be in valid format",
    "string.empty": "Task cannot be empty",
    "string.required": "Address is required",
    "string.max": "Address should not exceed 50 characters",
  }),

  contact_no: Joi.string().required().min(10).messages({
    "string.base": "10 is the minimum requirement",
    "string.required": "Phone Number is required",
    "string.empty": "Task cannot be empty",
    "string.min": "PhoneNumber should be at least 10",
  }),
});
export const updateUserSchema = Joi.object({
  email: Joi.string().required().max(50).min(10).email().messages({
    "string.email": "Email must be a valid format",
    "string.empty": "Email cannot be empty",
    "string.required": "Email is required",
    "string.min": "Email should contain at least 10 characters",
    "string.max": "Email should not exceed 50 characters",
  }),
  password: Joi.string()
    .required()
    .min(5)
    .max(10)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
    .messages({
      "string.required": "Password is required",
      "string.min": "Password should have minimum 5 Character",
      "string.max": "Password should not exceed 10 Characters",
      "string.empty": "Paaword cannot be empty",
    }),
});
