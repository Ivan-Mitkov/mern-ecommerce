import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    // user with name,email,password
    //make call to backend get data save in state, redirect
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //save token, change state
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch();
  };

  const signForm = () => (
    <form action="">
      <div className="form-group">
        <label className="text-muted" htmlFor="">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted" htmlFor="">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => {
    return (
      loading && (
        <div
          className="alert alert-info"
          style={{ display: loading ? "" : "none" }}
        >
          <h2>Loading...</h2>.
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
