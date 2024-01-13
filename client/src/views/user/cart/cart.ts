import axios from "axios";
import { ICart } from "../../../Interface/cart";

document.addEventListener("DOMContentLoaded", async function () {
  const cartContainer = document.getElementById("cart-container");
  const totalSpan = document.getElementById("total");

  try {
    // Replace the API endpoint with your actual endpoint
    const response = await axios.get("http://localhost:8000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Use the cart items from the API response
    const cartItems = response.data.data;
    console.log(cartItems);
    // Render cart items
    cartItems.forEach((item) => {
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

      // Add click event listener to the remove button
      const removeButton = cartItem.querySelector(".remove-btn");
      if (removeButton) {
        removeButton.addEventListener("click", () => {
          // Call the API to remove the item when the button is clicked
          removeCartItem(item.id);
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
  const checkoutButton = document.getElementById("checkout-btn");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      alert("Checkout functionality to be implemented.");
      // Implement your checkout logic here (redirect to checkout page, etc.)
    });
  }

  async function removeCartItem(cartItemId: number) {
    try {
      // Replace the API endpoint with your actual endpoint
      await axios.delete(`http://localhost:8000/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Remove the item from the DOM
      const removedItem = document
        .querySelector(`.cart-item [data-id="${cartItemId}"]`)
        ?.closest(".cart-item");
      if (removedItem) {
        removedItem.remove();
      }

      // Recalculate and display total
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
