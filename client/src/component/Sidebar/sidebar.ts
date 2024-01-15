const renderSideBar = (placeholder: HTMLElement) => {
  fetch("/component/Sidebar/sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      placeholder.innerHTML = data;
      const navLinks = document.querySelectorAll(".nav-link");
      console.log(navLinks);
      const logoutButton = document.getElementById("logout")!;
      console.log(logoutButton);
      if (logoutButton) {
        logoutButton.addEventListener("click", () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/component/Pages/login/login.html";
        });
      }
    });
};

export default renderSideBar;
