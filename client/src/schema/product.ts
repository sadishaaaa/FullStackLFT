import * as Yup from "yup";

export const ProductSchema = Yup.object({
  productName: Yup.string()
    .required("Product Name is required")
    .max(50, "Product Name should not exceed 50 characters")
    .min(5, "Product Name should have at least 5 characters"),
  productImage: Yup.mixed()
    .required("Product Image is required")
    .test(
      "fileType",
      "Invalid file type. Only images are allowed.",
      (value) => {
        if (value) {
          const file = value as File;
          const supportedImageTypes = ["image/jpeg", "image/png", "image/gif"];
          return supportedImageTypes.includes(file.type);
        }
        return false;
      }
    ),

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
