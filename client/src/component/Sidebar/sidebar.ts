const renderSideBar = (placeholder: HTMLElement) => {
  fetch("/component/Sidebar/sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      placeholder.innerHTML = data;
      const navLinks = document.querySelectorAll(".nav-link");
      console.log(navLinks);
    });
};

export default renderSideBar;
