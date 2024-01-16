import * as Yup from "yup";

export const UserSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name should not exceed 50 characters")
    .min(5, "First name should have at least 5 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name should not exceed 50 characters")
    .min(3, "Last name should have at least 3 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid format")
    .max(50, "Email should not exceed 50 characters")
    .min(10, "Email should contain at least 10 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should have at least 5 characters")
    .max(20, "Password should not exceed 20 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
      "Password must meet the specified criteria"
    ),

  address: Yup.string()
    .required("Address is required")
    .max(50, "Address should not exceed 50 characters"),

  contactNo: Yup.string()
    .required("Phone Number is required")
    .min(10, "Phone Number should be at least 10 characters"),
});

export const updateUserSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid format")
    .min(10, "Email should contain at least 10 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should have at least 5 characters")
    .max(10, "Password should not exceed 10 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
      "Password must meet the specified criteria"
    ),
});
