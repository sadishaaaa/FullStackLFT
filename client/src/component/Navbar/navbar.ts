import axios from "axios";

const renderNavBar = (placeholder: HTMLElement) => {
  fetch("/component/Navbar/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      //to  the content of a specified HTML element (placeholder) to the fetched HTML content
      placeholder.innerHTML = data;
      // const navLinks = document.querySelectorAll(".nav__item");

      // for (const navLink of navLinks) {
      //   navLink.classList.remove("active");
      // }
      // const currentPage = document.getElementById(active);
      // currentPage!.classList.add("active");

      const openSidebarSpan = document.getElementById("openSidebar")!;
      openSidebarSpan.onclick = openSidebar;

      const closeSidebarSpan = document.getElementById("menu")!;
      closeSidebarSpan.onclick = closeSidebar;

      async function updateCartBadge() {
        const cartIcon = document.getElementById("cartIcon");
        const cartBadge = document.getElementById("cartBadge");

        const demoCount = 0;

        if (cartIcon && cartBadge) {
          cartBadge.textContent = demoCount.toString();
        }

        try {
          const response = await axios.get("http://localhost:8000/cart/count", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          const count = response.data.data;
          console.log("Cart Count:", count);

          if (cartBadge) {
            cartBadge.textContent = count.toString();
          }
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }

      updateCartBadge();
    });
};

function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  console.log(sidebar);
  if (sidebar) {
    sidebar.style.width = "60%";
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.width = "0";
  }
}

export default renderNavBar;
