import axios from "axios";

const signupEndpoint = "http://localhost:8000/auth/signup";

// Selecting DOM elements
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
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      address: address.value,
      contactNo: contactNo.value,
    };

    const response = await axios.post(signupEndpoint, userData);

    console.log("User signed up successfully", response.data);
    window.location.href = "../login/login.html";
  } catch (error) {
    console.log(error);
  }
});
