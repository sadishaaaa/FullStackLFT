const renderNavBar = (placeholder: HTMLElement, active: string) => {
  fetch("/component/Navbar/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      placeholder.innerHTML = data;
      const navLinks = document.querySelectorAll(".nav__item");

      for (const navLink of navLinks) {
        navLink.classList.remove("active");
      }
      const currentPage = document.getElementById(active);
      currentPage!.classList.add("active");

      const openSidebarSpan = document.getElementById("openSidebar")!;
      openSidebarSpan.onclick = openSidebar;

      const closeSidebarSpan = document.getElementById("menu")!;
      closeSidebarSpan.onclick = closeSidebar;
    });
};

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  console.log(sidebar);
  if (sidebar) {
    sidebar.style.width = "100%";
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.width = "0";
  }
}
export default renderNavBar;
