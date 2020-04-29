import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAutenticated();

  const loadProducts = () => {
    getProducts().then((products) => {
      if (products.error) {
        console.log(products.error);
      } else {
        setProducts(products.data);
      }
    });
  };

  const removeProduct = (productId) => {
    deleteProduct(productId, user._id, token).than((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
        console.log(products);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Menage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <h2 className="mb-4">Manage Products</h2>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => removeProduct(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
