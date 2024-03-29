import axios from "axios";
import { ICart } from "../../../Interface/cart";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
document.addEventListener("DOMContentLoaded", async function () {
  const cartContainer = document.getElementById("cart-container");
  const totalSpan = document.getElementById("total");
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("Signup for add to cart functionality");
    window.location.href = "/views/user/home.html";
    return;
  }

  try {
    const response = await axios.get("http://localhost:8000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      window.location.href = "/component/Pages/login/login.html";
      Toastify({
        text: "Please log in or sign up to add items to your cart.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
      return;
    }

    const cartItems = response.data.data;
    console.log(cartItems);

    cartItems.forEach((item: any) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
          <div>
            <img src="${item.productImage}" alt="${item.productName}">
          </div>
          <div>
            <h3>${item.productName}</h3>
          </div>
          <div>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <div>
            <p>Price: $${item.price.toFixed(2)}</p>
          </div>
          <div>
            <p>Subtotal: $${item.subtotal.toFixed(2)}</p>
          </div>
          <div>
            <button class="remove-btn" data-id=${item.id}>Remove</button>
          </div>
        `;

      if (cartContainer) {
        cartContainer.appendChild(cartItem);
      }
      const removeButton = cartItem.querySelector(".remove-btn");
      if (removeButton) {
        removeButton.addEventListener("click", () => {
          removeCartItem(item.id);
          Toastify({
            text: "Item removed sucessfully",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
          }).showToast();
        });
      }
    });

    // Calculate and display total
    const total = cartItems.reduce(
      (acc: number, item: ICart) => acc + item.subtotal,
      0
    );
    if (totalSpan) {
      totalSpan.textContent = total.toFixed(2);
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }

  // Checkout button click event
  //   const checkoutButton = document.getElementById("checkout-btn");
  //   if (checkoutButton) {
  //     checkoutButton.addEventListener("click", () => {
  //       alert("Checkout functionality to be implemented.");
  //       // Implement your checkout logic here (redirect to checkout page, etc.)
  //     });
  //   }

  async function removeCartItem(cartItemId: number) {
    try {
      await axios.delete(`http://localhost:8000/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const removedItem = document
        .querySelector(`.cart-item [data-id="${cartItemId}"]`)
        ?.closest(".cart-item");
      if (removedItem) {
        removedItem.remove();
      }
      const updatedTotal = cartItems
        .filter((item: ICart) => item.id !== cartItemId)
        .reduce((acc: number, item: ICart) => acc + item.subtotal, 0);
      if (totalSpan) {
        totalSpan.textContent = updatedTotal.toFixed(2);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  }
});
