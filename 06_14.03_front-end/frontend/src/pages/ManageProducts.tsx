import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import "./ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  const deleteProduct = (id: number) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json()) // eeldame, et back-end tagastab uuendatud toodete nimekirja
      .then(json => setProducts(json));
  };

  return (
    <div className="manage-products">
      <h2>Manage products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Action</th> {/* lisame veeru nupu jaoks */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.image}</td>
              <td>{product.category.name}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
