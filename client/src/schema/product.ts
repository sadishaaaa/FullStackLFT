import * as Yup from "yup";

export const ProductSchema = Yup.object({
  productName: Yup.string()
    .required("Product Name is required")
    .max(50, "Product Name should not exceed 50 characters")
    .min(5, "Product Name should have at least 5 characters"),

  description: Yup.string()
    .required("Description is required")
    .max(255, "Description should not exceed 255 characters")
    .min(5, "Description should have at least 5 characters"),

  price: Yup.number()
    .required("Price is required")
    .typeError("Price must be a valid number"),

  stock: Yup.number()
    .required("Stock is required")
    .typeError("Stock must be a valid number"),
});

// If you need to define an update user schema (though it's currently an empty Joi object), you can do so in Yup as follows:
export const updateUserSchema = Yup.object({});
