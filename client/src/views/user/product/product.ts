import axios from "axios";
import { IProduct } from "../../admin/product/Iproduct";
import { ICart } from "../../../Interface/cart";
import { getUserIdFromToken } from "../../../utils/getUserID";
import { setupQuantityButtons } from "../../../utils/quantityButtons";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    const products: IProduct[] = response.data.data;
    console.log(response.data.data);
    const productsContainer = document.getElementById("productContainer");

    if (productsContainer) {
      productsContainer.innerHTML = ""; // Clear previous content

      products.forEach((product: IProduct) => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
          <img src="${product.productImage}" alt="${product.productName}" class="img-thumbnail">
          <div class="product__description">
          <h4>${product.productName}</h4>
          <p><b>Price:</b> ${product.price}</p>
          <div class= "product__action">
          <div class="quantity">
          <button class="btn quantity__btn" id="decrease" data-product-id="${product.id}">-</button>
          <span class="quantity__value">1</span>
          <button class="btn quantity__btn" id="increase" data-product-id="${product.id}">+</button>
          </div>
          <div class="button">
            <button type="button" class="btn button__addToBtn" data-product-id="${product.id}">Add To Cart</button>
          </div>
          </div>
          </div>
          
        `;
        const increaseButton = card.querySelector(
          "#increase"
        ) as HTMLButtonElement;
        const decreaseButton = card.querySelector(
          "#decrease"
        ) as HTMLButtonElement;
        const quantityValue = card.querySelector(
          ".quantity__value"
        ) as HTMLSpanElement;

        const quantityHandler = setupQuantityButtons(
          increaseButton,
          decreaseButton,
          quantityValue,
          1
        );

        const addToCartButton = card.querySelector(
          ".button__addToBtn"
        ) as HTMLButtonElement;
        addToCartButton.addEventListener("click", () => {
          const accessToken = localStorage.getItem("accessToken");
          const userId = accessToken ? getUserIdFromToken(accessToken) : null;

          if (userId !== null) {
            const productId = product.id;
            const quantity = quantityHandler.getQuantity(); // You may adjust the quantity as needed
            const subtotal = product.price * quantity;

            const cartData = {
              user_id: userId,
              product_id: productId,
              quantity: quantity,
              subtotal: subtotal,
            };

            // Send the payload to the backend API
            sendToBackend(cartData);
          } else {
            console.error("User is not authenticated");
          }
        });
        card.addEventListener("click", () => {
          redirectToProductSinglePage(product.id);
        });

        productsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});

function sendToBackend(cartData: ICart) {
  // Make an API call to send the payload to the backend
  axios
    .post("http://localhost:8000/cart", cartData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => {
      console.log("Added to cart:", response.data);
      // You may handle success or update the UI accordingly
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
      // You may handle errors or show an error message to the user
    });
}
function redirectToProductSinglePage(productId: string) {
  // Replace the URL with your actual product single page URL and include the product ID as a parameter
  const productSinglePageUrl = `../product/productSingle.html?id=${productId}`;
  window.location.href = productSinglePageUrl;
}
