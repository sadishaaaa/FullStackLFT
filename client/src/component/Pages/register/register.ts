import axios from "axios";
import Toastify from "toastify-js";
import { UserSchema } from "../../../schema/auth"; // Adjust the path based on your project structure

import "toastify-js/src/toastify.css";

const signupEndpoint = "http://localhost:8000/auth/signup";

const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const address = document.getElementById("address") as HTMLInputElement;
const contactNo = document.getElementById("contactNo") as HTMLInputElement;
const signUpButton = document.getElementById(
  "signUpButton"
) as HTMLButtonElement;

signUpButton.addEventListener("click", async (event) => {
  try {
    event.preventDefault();

    // Creating an object with the form data
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      address: address.value,
      contactNo: contactNo.value,
    };

    // Validating the form data against the Yup schema
    await UserSchema.validate(userData, { abortEarly: false });

    // If validation passes, proceed with the API call
    const response = await axios.post(signupEndpoint, userData);

    Toastify({
      text: "Registered Successfully",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "green",
    }).showToast();

    console.log("User signed up successfully", response.data);
    window.location.href = "../login/login.html";
  } catch (error) {
    // Handle Yup validation errors
    if (error.name === "ValidationError") {
      error.errors.forEach((errorMessage: string) => {
        Toastify({
          text: errorMessage,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
        }).showToast();
      });
    } else {
      Toastify({
        text: `Registration Failed: ${error.message}`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();

      console.error(error);
    }
  }
});
