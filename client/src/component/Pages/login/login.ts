import axios from "axios";

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
    const response = await axios.post(signInEndpoint, userData);
    const userRole = response.data.user.role;
    console.log(userRole);
    if (userRole === "user") {
      window.location.href = "/component/Pages/home.html";
    } else if (userRole === "admin") {
      window.location.href = "/component/Sidebar/sidebar.html";
    }
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    console.log("login successfully", response.data);
  } catch (error) {
    console.log(error);
  }
});
