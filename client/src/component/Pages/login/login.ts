import axios from "axios";
import Toastify from "toastify-js";
import { updateUserSchema } from "../../../schema/auth";
import "toastify-js/src/toastify.css";

const signInEndpoint = "http://localhost:8000/auth/login";
const email = document.getElementById("signInEmail") as HTMLInputElement;
const password = document.getElementById("signInPassword") as HTMLInputElement;
const signInButton = document.getElementById(
  "signInButton"
) as HTMLButtonElement;

signInButton.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };

    await updateUserSchema.validate(userData, { abortEarly: false });
    const response = await axios.post(signInEndpoint, userData);

    const userRole = response.data.user.role;
    console.log(userRole);

    if (userRole === "user") {
      window.location.href = "/views/user/home.html";
    } else if (userRole === "admin") {
      window.location.href = "/views/admin/product/product.html";
    }

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    Toastify({
      text: "Login Successfully",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "green",
    }).showToast();

    console.log("Login successful", response.data);
  } catch (error) {
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
        text: `Login Failed: ${error.message}`,
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
