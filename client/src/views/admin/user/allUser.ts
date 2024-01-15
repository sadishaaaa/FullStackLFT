import axios from "axios";
import { IUser } from "./IUser";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const user: IUser[] = response.data.data;
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
      user.forEach((user: IUser) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
          <td>${user.address}</td>
          <td>${user.contactNo}</td>
          <td>
          <button class="btn btn-danger delete-btn" data-product-id="${user.id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      table.appendChild(tableBody);

      userContainer.appendChild(table);
    }
  } catch (error) {
    console.log("Error fetching product data:", error);
  }
});
