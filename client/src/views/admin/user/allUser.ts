import axios from "axios";
import { IUser } from "./IUser";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
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
          <th scope="col">first Name</th>
          <th scope="col">last Name</th>
          <th scope="col">email</th>
          <th scope="col">address</th>
          <th scope="col">contact NO</th>
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
            <button class="btn btn-primary"><a href="/views/admin/product/updateProduct.html">Update</a></button>
            <button class="btn btn-danger">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      table.appendChild(tableBody);

      userContainer.appendChild(table);
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});
