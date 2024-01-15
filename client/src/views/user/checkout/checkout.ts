// checkout.ts
import axios from "axios";
import { IProduct } from "../../admin/product/Iproduct";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { OrderSchema } from "../../../schema/order";
document.addEventListener("DOMContentLoaded", async () => {
  // Get the product list container
  const productListContainer = document.getElementById("productList");
  const totalContainer = document.getElementById("total");
  let totalPrice: number;
  let cartItems: IProduct[]; // Assuming IProduct is the type of your product

  try {
    const response = await axios.get("http://localhost:8000/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    cartItems = response.data.data;
    console.log(cartItems[0]);

    // Iterate through the cart items and create HTML elements for each
    (
      document.getElementById("name") as HTMLInputElement
    ).value = `${cartItems[0].firstName} ${cartItems[0].lastName}`;
    (document.getElementById("email") as HTMLInputElement).value =
      cartItems[0].email;
    (document.getElementById("contactNo") as HTMLInputElement).value =
      cartItems[0].contactNo;

    cartItems.forEach((item) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
        <div>
          
          <img src="${item.productImage}" alt="${item.productName}" />
          <p> <b>Product Name: ${item.productName}</b></p>
          <p>Price: ${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
      `;
      if (productListContainer) {
        productListContainer.appendChild(productItem);
      }
    });

    // Calculate and display the total price
    totalPrice = cartItems.reduce(
      (total: number, item) => total + item.price * item.quantity,
      0
    );
    if (totalContainer) {
      totalContainer.innerHTML = `<p>Total: ${totalPrice}</p>`;
    }
  } catch (error) {
    console.error("Error fetching cart items", error);
  }

  const placeOrderButton = document.querySelector("button");

  if (placeOrderButton) {
    // Add a click event listener to the "Place Order" button
    placeOrderButton.addEventListener("click", async () => {
      try {
        // Ensure totalPrice and cartItems are defined
        if (totalPrice !== undefined && cartItems !== undefined) {
          console.log(cartItems);
          await OrderSchema.validate(
            {
              shipping_address: (
                document.getElementById("shippingAddress") as HTMLInputElement
              ).value,
              billing_address: (
                document.getElementById("billingAddress") as HTMLInputElement
              ).value,
              payment_status: false,
              user_id: cartItems[0].userId,
              mode_of_payment: (
                document.getElementById("paymentMode") as HTMLInputElement
              ).value,
              subtotal: totalPrice,
            },
            { abortEarly: false }
          );

          // Prepare the JSON data for the POST request
          const orderData = {
            body: {
              shipping_address: (
                document.getElementById("shippingAddress") as HTMLInputElement
              ).value,
              billing_address: (
                document.getElementById("billingAddress") as HTMLInputElement
              ).value,
              payment_status: false,
              user_id: cartItems[0].userId,
              mode_of_payment: (
                document.getElementById("paymentMode") as HTMLInputElement
              ).value,
              subtotal: totalPrice,
            },
            products: cartItems.map((item) => ({
              product_id: item.productId,
              quantity: item.quantity,
            })),
          };

          //   Make a POST request to the backend
          const response = await axios.post(
            "http://localhost:8000/order",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
          Toastify({
            text: "Order placed sucessfully",
            duration: -1,
            close: true,
            stopOnFocus: true,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
            style: { width: "500px" },
          }).showToast();
          console.log(response.data);
          window.location.href = "../../user/confirm/confirm.html";
        } else {
          console.error("Error: totalPrice or cartItems is undefined");
        }
      } catch (error) {
        // Handle Yup validation errors
        if (error.name === "ValidationError") {
          error.errors.forEach((errorMessage: string) => {
            Toastify({
              text: errorMessage,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "right",
              backgroundColor: "red",
            }).showToast();
          });
        } else {
          // Handle other errors (e.g., network errors)
          Toastify({
            text: "Order Failed",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
          }).showToast();

          console.error("Error placing the order", error);
        }
      }
    });
  }
});
