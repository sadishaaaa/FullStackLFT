import axios from "axios";
import { setupQuantityButtons } from "../../../utils/quantityButtons";
import { ICart } from "../../../Interface/cart";
import { getUserIdFromToken } from "../../../utils/getUserID";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8000/products/${productId}`);
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const renderProductDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    console.error("Product ID not provided in the URL.");
    return;
  }

  const productContainer = document.getElementById("productContainer");
  const productDetails = await getProductDetails(productId);
  console.log(productDetails);

  if (productDetails) {
    const stockStatus = productDetails.stock > 0 ? "Available" : "Out of stock";
    productContainer.innerHTML = `
            <div class="product-image">
              <img src="${
                productDetails.productimage
              }" alt="Product Image" style="max-width: 100%" />
            </div>
            <div class="product-info">
              <h2>${productDetails.productName}</h2>
              <p>In Stock: <strong>${stockStatus}</strong></p>
              <p>Description: ${productDetails.description}</p>
              <p class="price">$${productDetails.price.toFixed(2)}</p>
              <div class= "product__action">
          <div class="quantity">
          <button class="btn quantity__btn" id="decrease" data-product-id="${
            productDetails.id
          }">-</button>
          <span class="quantity__value">1</span>
          <button class="btn quantity__btn" id="increase" data-product-id="${
            productDetails.id
          }">+</button>
          </div>
          <div class="button">
            <button type="button" class="btn button__addToBtn" data-product-id="${
              productDetails.id
            }">Add To Cart</button>
          </div>
          </div>
            
          `;
    const increaseButton = productContainer.querySelector(
      "#increase"
    ) as HTMLButtonElement;
    const decreaseButton = productContainer.querySelector(
      "#decrease"
    ) as HTMLButtonElement;
    const quantityValue = productContainer.querySelector(
      ".quantity__value"
    ) as HTMLSpanElement;

    const quantityHandler = setupQuantityButtons(
      increaseButton,
      decreaseButton,
      quantityValue,
      1
    );

    const addToCartButton = productContainer.querySelector(
      ".button__addToBtn"
    ) as HTMLButtonElement;
    addToCartButton.addEventListener("click", () => {
      const accessToken = localStorage.getItem("accessToken");
      const userId = accessToken ? getUserIdFromToken(accessToken) : null;

      if (userId !== null) {
        if (productDetails.stock > 0) {
          const productId = productDetails.id;
          const quantity = quantityHandler.getQuantity();
          const subtotal = productDetails.price * quantity;

          const cartData = {
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            subtotal: subtotal,
          };

          sendToBackend(cartData);
          Toastify({
            text: "Added to cart successfully",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
          }).showToast();
        } else {
          Toastify({
            text: "This product is currently out of stock.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
          }).showToast();
        }
      } else {
        Toastify({
          text: "Signup to add products in cart",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
        }).showToast();
      }
    });
  }
};

window.addEventListener("DOMContentLoaded", renderProductDetails);

function sendToBackend(cartData: ICart) {
  axios
    .post("http://localhost:8000/cart", cartData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => {
      console.log("Added to cart:", response.data);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
}
