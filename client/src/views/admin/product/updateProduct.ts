// updateProduct.ts
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  try {
    const response = await axios.get(
      `http://localhost:8000/products/${productId}`
    );
    const product = response.data.data;

    // Populate form fields with product details
    (document.getElementById("productName") as HTMLInputElement).value =
      product.productName;
    (document.getElementById("description") as HTMLInputElement).value =
      product.description;
    (document.getElementById("price") as HTMLInputElement).value =
      product.price.toString();
    (document.getElementById("stock") as HTMLInputElement).value =
      product.stock.toString();

    // Add event listener for form submission
    const updateProductForm = document.getElementById("updateProductForm");
    updateProductForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Collect updated data from the form
      const updatedData = {
        productName: (
          document.getElementById("productName") as HTMLInputElement
        ).value,
        description: (
          document.getElementById("description") as HTMLInputElement
        ).value,
        price: parseFloat(
          (document.getElementById("price") as HTMLInputElement).value
        ),
        stock: parseInt(
          (document.getElementById("stock") as HTMLInputElement).value,
          10
        ),
        // Add more fields as needed
      };

      try {
        // Send update request to the API
        await axios.put(
          `http://localhost:8000/products/${productId}`,
          updatedData
        );
        alert("Product updated successfully!");
        // Redirect to the product list page or perform other actions
      } catch (error) {
        console.error("Error updating product:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
});
