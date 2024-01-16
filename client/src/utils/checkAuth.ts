import axios from "axios";

const checkAuth = async () => {
  const accessToken = localStorage.getItem("accessToken") || "";
  if (accessToken !== "") {
    const response = await axios.get("http://localhost:8000/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } else {
    window.location.href = "../component/Pages/login/login.html";
  }
};

await checkAuth();
