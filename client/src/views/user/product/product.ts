import axios from "axios";
import { IProduct } from "../../admin/product/Iproduct";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    const products: IProduct[] = response.data.data;
    console.log(response.data.data);
    const productsContainer = document.getElementById("productContainer");

    if (productsContainer) {
      productsContainer.innerHTML = "";

      products.forEach((product: IProduct) => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
          <img src="${product.productImage}" alt="${product.productName}" class="img-thumbnail">
          <div class="product__description">
            <h4>${product.productName}</h4>
            <p><b>Price:</b> ${product.price}</p>
          </div>
        `;

        const addToCartButton = document.createElement("button");
        addToCartButton.type = "button";
        addToCartButton.className = "btn button__addToBtn";
        addToCartButton.dataset.productId = `${product.id}`;
        addToCartButton.textContent = "View Details"; // You can customize the button text

        addToCartButton.addEventListener("click", () => {
          redirectToProductSinglePage(`${product.id}`);
        });

        card.appendChild(addToCartButton);
        productsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});

// Remove the setupQuantityButtons function and related code

// Remove the quantity-related event listener and logic for the "Add to Cart" button

function redirectToProductSinglePage(productId: string) {
  // Replace the URL with your actual product single page URL and include the product ID as a parameter
  const productSinglePageUrl = `../product/productSingle.html?id=${productId}`;
  window.location.href = productSinglePageUrl;
}
