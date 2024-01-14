import Joi from "joi";

export const OrderSchema = Joi.object({
  shipping_address: Joi.string().required().max(255).messages({
    "string.base": "Shipping Address is required",
    "string.empty": "Shipping Address cannot be empty",
    "string.required": "Shipping Address is required",
    "string.max": "Shipping Address should not exceed 255 characters",
  }),

  billing_address: Joi.string().required().max(255).messages({
    "string.base": "Billing Address is required",
    "string.empty": "Billing Address cannot be empty",
    "string.required": "Billing Address is required",
    "string.max": "Billing Address should not exceed 255 characters",
  }),

  payment_status: Joi.boolean().required().messages({
    "boolean.required": "Payment Status is required",
  }),

  user_id: Joi.number().required().messages({
    "number.required": "User ID is required",
  }),

  mode_of_payment: Joi.string().required().messages({
    "string.base": "Mode of Payment is required",
    "string.empty": "Mode of Payment cannot be empty",
    "string.required": "Mode of Payment is required",
  }),

  subtotal: Joi.number().required().messages({
    "number.required": "Subtotal is required",
  }),
});
