import axios from "axios";
import Toastify from "toastify-js";

import "toastify-js/src/toastify.css";
const addProductEndpoint = "http://localhost:8000/products";
const productName = document.getElementById("productName") as HTMLInputElement;
const productImage = document.getElementById(
  "productImage"
) as HTMLInputElement;
const productDescription = document.getElementById(
  "productDescription"
) as HTMLInputElement;
const productPrice = document.getElementById(
  "productPrice"
) as HTMLInputElement;
const productStock = document.getElementById(
  "productStock"
) as HTMLInputElement;
const addProductButton = document.getElementById(
  "addProductBtn"
) as HTMLButtonElement;

addProductButton.addEventListener("click", async (event) => {
  try {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName.value);
    if (productImage.files && productImage.files[0]) {
      formData.append("file", productImage.files[0]);
    }

    formData.append("description", productDescription.value);
    formData.append("price", productPrice.value);
    formData.append("stock", productStock.value);

    const response = await axios.post(addProductEndpoint, formData);
    resetInputFields();
    Toastify({
      text: "Product added successfully",
      duration: 3000, // 3 seconds
      close: true,
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'right', 'center'
      backgroundColor: "green",
    }).showToast();
    console.log("Product added successfully", response.data);
  } catch (error) {
    Toastify({
      text: "Product added successfully",
      duration: 3000, // 3 seconds
      close: true,
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'right', 'center'
      backgroundColor: "green",
    }).showToast();
    console.log("Error adding product:", error);
  }
});

function resetInputFields() {
  // Reset the values of input fields to their initial state
  productName.value = "";
  productImage.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productStock.value = "";
}
