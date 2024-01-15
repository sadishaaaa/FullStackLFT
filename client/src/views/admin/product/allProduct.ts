import axios from "axios";
import { IProduct } from "./Iproduct";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:8000/products");
    const products: IProduct[] = response.data.data;
    console.log(response.data.data);
    const productsContainer = document.getElementById("product_Container");

    if (productsContainer) {
      const table = document.createElement("table");
      table.className = "table table-bordered";

      // Table header
      const tableHeader = document.createElement("thead");
      tableHeader.innerHTML = `
        <tr>
          <th scope="col">Product Image</th>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      `;
      table.appendChild(tableHeader);
      // ... (your existing code)

      // Table body
      const tableBody = document.createElement("tbody");
      products.forEach((product: IProduct) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td><img src="${product.productImage}" alt="${product.productName}" class="img-thumbnail" style="max-width: 100px;"></td>
    <td>${product.productName}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>
      <button class="btn btn-primary update-btn" data-product-id="${product.id}"><span class="material-symbols-outlined icon">
      update
      </span></button>
      <button class="btn btn-danger delete-btn" data-product-id="${product.id}"><span class="material-symbols-outlined icon">
      delete
      </span></button>
    </td>
  `;

        // Add event listener for the "Update" button
        const updateBtn = row.querySelector(".update-btn");
        updateBtn?.addEventListener("click", () => {
          const productId = updateBtn.getAttribute("data-product-id");
          window.location.href = `/views/admin/product/updateProduct.html?id=${productId}`;
        });

        // Add event listener for the "Delete" button
        const deleteBtn = row.querySelector(".delete-btn");
        deleteBtn?.addEventListener("click", async () => {
          const productId = deleteBtn.getAttribute("data-product-id");
          try {
            await axios.delete(`http://localhost:8000/products/${productId}`);
            // You may also want to update the UI to reflect the deletion
            row.remove();
          } catch (error) {
            console.error(
              `Error deleting product with ID ${productId}:`,
              error
            );
          }
        });

        tableBody.appendChild(row);
      });
      table.appendChild(tableBody);

      productsContainer.appendChild(table);

      // Table body
      //   const tableBody = document.createElement("tbody");
      //   products.forEach((product: IProduct) => {
      //     const row = document.createElement("tr");
      //     row.innerHTML = `
      //       <td><img src="${product.productImage}" alt="${product.productName}" class="img-thumbnail" style="max-width: 100px;"></td>
      //       <td>${product.productName}</td>
      //       <td>${product.description}</td>
      //       <td>${product.price}</td>
      //       <td>${product.stock}</td>
      //       <td>
      //         <button class="btn btn-primary"><a href="/views/admin/product/updateProduct.html">Update</a></button>
      //         <button class="btn btn-danger">Delete</button>
      //       </td>
      //     `;
      //     tableBody.appendChild(row);
      //   });
      //   table.appendChild(tableBody);

      //   productsContainer.appendChild(table);
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
});
