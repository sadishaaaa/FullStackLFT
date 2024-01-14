import * as Yup from "yup";

export const OrderSchema = Yup.object({
  shipping_address: Yup.string()
    .required("Shipping Address is required")
    .max(255, "Shipping Address should not exceed 255 characters"),

  billing_address: Yup.string()
    .required("Billing Address is required")
    .max(255, "Billing Address should not exceed 255 characters"),

  payment_status: Yup.boolean().required("Payment Status is required"),

  user_id: Yup.number().required("User ID is required"),

  mode_of_payment: Yup.string()
    .required("Mode of Payment is required")
    .max(255, "Mode of Payment should not exceed 255 characters"),

  subtotal: Yup.number().required("Subtotal is required"),
});
