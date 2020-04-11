import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAutenticated();
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} should be unique</h3>;
    }
  };
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
          Back to Dashboard
        </Link>
      </div>
    );
  };
  return (
    <Layout
      title="Add New Category"
      description={`Good day ${user.name}, add new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
