// import statements...

import axios from "axios";
import { IOrder } from "../../../Interface/order";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/order/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const orders: IOrder[] = response.data.data;
    console.log(response.data.data);
    const orderContainer = document.getElementById("orderContainer");

    if (orderContainer) {
      const table = document.createElement("table");
      table.className = "table table-bordered";

      // Table header
      const tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Order Date</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Image</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        `;
      table.appendChild(tableHeader);

      const tableBody = document.createElement("tbody");
      orders.forEach((order: IOrder) => {
        const row = document.createElement("tr");

        const paymentStatusText = order.paymentStatus ? "Done" : "Pending";

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.userId}</td>
            <td>${order.firstName}</td>
            <td>${order.lastName}</td>
            <td>${order.orderDate}</td>
            <td>${order.productName}</td>
            <td>${order.productImage}</td>
            <td>${order.price}</td>
            <td id="paymentStatus_${order.id}">${paymentStatusText}</td>
            
            <td>
              
              <button class="btn btn-primary change-status-btn" data-order-id="${order.id}">Change Status</button>
            </td>
          `;
        // <button class="btn btn-danger delete-btn" data-order-id="${order.id}">Delete</button>
        tableBody.appendChild(row);
      });

      table.appendChild(tableBody);
      orderContainer.appendChild(table);

      // Add event listeners to "Change Status" buttons
      const changeStatusButtons =
        document.querySelectorAll(".change-status-btn");
      changeStatusButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const orderId = event.currentTarget.getAttribute("data-order-id");
          console.log(orderId);

          try {
            const orderToUpdate = orders.find((order) => order.id === orderId);
            const newPaymentStatus = !orderToUpdate?.paymentStatus;

            const response = await axios.put(
              `http://localhost:8000/order/changestatus/${orderId}`,
              {
                paymentStatus: newPaymentStatus,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                  "Content-Type": "application/json",
                },
              }
            );

            // Update the payment status text in the DOM
            const paymentStatusElement = document.getElementById(
              `paymentStatus_${orderId}`
            );
            if (paymentStatusElement) {
              paymentStatusElement.textContent = newPaymentStatus
                ? "Done"
                : "Pending";
            }

            // Update the payment status in the local data
            if (orderToUpdate) {
              orderToUpdate.paymentStatus = newPaymentStatus;
            }

            console.log(response.data);
          } catch (error) {
            console.error("Error updating payment status", error);
          }
        });
      });
    }
  } catch (error) {
    console.log("Error fetching order data:", error);
  }
});
