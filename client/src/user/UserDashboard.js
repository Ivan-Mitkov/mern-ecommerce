import React from "react";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAutenticated();
  return (
    <Layout
      title="Dashboard"
      description="User Dashboard"
      className="container"
    >
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">History</li>
        </ul>
      </div>
    </Layout>
  );
};

export default UserDashboard;
