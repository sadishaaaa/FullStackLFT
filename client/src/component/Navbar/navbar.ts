import axios from "axios";

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

      async function updateCartBadge() {
        const cartIcon = document.getElementById("cartIcon");
        const cartBadge = document.getElementById("cartBadge");

        // Set a demo count for testing
        const demoCount = 1;

        if (cartIcon && cartBadge) {
          // Set the demo count in the badge
          cartBadge.textContent = demoCount.toString();
        }

        try {
          const response = await axios.get("http://localhost:8000/cart/count", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          const count = response.data.data;

          // const cartCount = await response.json();
          console.log("Cart Count:", count);

          // Update the actual count in the badge
          cartBadge.textContent = count.toString();
          // cartBadge.textContent = demoCount;
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }

      // Execute the function on page load
      // window.addEventListener("DOMContentLoaded", updateCartBadge);
      updateCartBadge();
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
