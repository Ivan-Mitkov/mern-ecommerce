import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAutenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            {" "}
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            {" "}
            <Link className="nav-link" to="/admin/orders">
              Orders{" "}
            </Link>
          </li>
          <li className="list-group-item">
            {" "}
            <Link className="nav-link" to="/admin/products">
             Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Good day ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
