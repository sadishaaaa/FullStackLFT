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
            <p><b>Price: ${product.price}</b> </p>
          </div>
        `;

        card.addEventListener("click", () => {
          redirectToProductSinglePage(`${product.id}`);
        });

        productsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});

function redirectToProductSinglePage(productId: string) {
  const productSinglePageUrl = `../product/productSingle.html?id=${productId}`;
  window.location.href = productSinglePageUrl;
}
