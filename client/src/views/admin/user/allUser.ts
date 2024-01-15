import axios from "axios";
import { IUser } from "./IUser";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const users: IUser[] = response.data.data;
    console.log(response.data.data);
    const userContainer = document.getElementById("userContainer");

    if (userContainer) {
      const table = document.createElement("table");
      table.className = "table table-bordered";

      // Table header
      const tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">ContactNo</th>
          <th scope="col">Actions</th>
        </tr>
      `;
      table.appendChild(tableHeader);

      // Table body
      const tableBody = document.createElement("tbody");
      users.forEach((user: IUser) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.address}</td>
          <td>${user.contactNo}</td>
          <td>
            <button class="btn btn-danger delete-btn" data-user-id="${user.id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      table.appendChild(tableBody);

      userContainer.appendChild(table);

      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const userId = event.currentTarget.dataset.userId;
          const confirmDelete = confirm(
            "Are you sure you want to delete this user?"
          );
          if (confirmDelete) {
            try {
              await axios.delete(`http://localhost:8000/users/${userId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              });
              event.currentTarget.closest("tr").remove();

              Toastify({
                text: "User deleted successfully",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "green",
              }).showToast();
            } catch (error) {
              console.error("Error deleting user:", error);

              Toastify({
                text: "Error deleting user",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
              }).showToast();
            }
          }
        });
      });
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
});
