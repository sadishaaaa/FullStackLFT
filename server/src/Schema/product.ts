import Joi from "joi";
export const ProductSchema = Joi.object({
  product_name: Joi.string().required().max(50).min(5).messages({
    "string.base": "Product Name is required",
    "string.empty": "Product Name  cannot be empty",
    "string.required": "Product Name  is required",
    "string.max": "Product Name should not exeed  50 charcter ",
    "string.min": "Product Name  should  have atleast 5 charcter ",
  }),
  product_image: Joi.string().required().max(50).messages({
    "string.base": "Product Image is required",
    "string.empty": "Product Image  cannot be empty",
    "string.required": "Product Image  is required",
    "string.max": "Product Image should not exeed  50 charcter ",
  }),
  description: Joi.string().required().max(255).min(5).messages({
    "string.empty": "Description cannot be empty",
    "string.required": "Description is required",
    "string.max": "Description should not exeed  255 charcter ",
    "string.min": "Description should  have atleast 5 charcter ",
  }),
  price: Joi.number().required().messages({
    "number.empty": "Price cannot be empty",
    "number.required": "Price is required",
  }),
  stock: Joi.number().required().messages({
    "number.empty": "Price cannot be empty",
    "number.required": "Price is required",
  }),
});
export const updateUserSchema = Joi.object({});
