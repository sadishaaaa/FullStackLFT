import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "../login/login.html";
    return;
  }
  try {
    const response = await axios.get("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    const firstNameElement = document.getElementById("firstName");
    const lastNameElement = document.getElementById("lastName");
    const emailElement = document.getElementById("email");
    const addressElement = document.getElementById("address");
    const contactElement = document.getElementById("contactNo");
    if (firstNameElement) {
      firstNameElement.textContent = response.data.data.firstName;
    }
    if (lastNameElement) {
      lastNameElement.textContent = response.data.data.lastName;
    }
    if (emailElement) {
      emailElement.textContent = response.data.data.email;
    }
    if (addressElement) {
      addressElement.textContent = response.data.data.address;
    }
    if (contactElement) {
      contactElement.textContent = response.data.data.contactNo;
    }
  } catch (error) {
    console.log("");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const logoutButton = document.getElementById("logout");
  console.log(logoutButton);
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("accessToken");

      localStorage.removeItem("refreshToken");
      window.location.href = "../login/login.html";
    });
  }
});
