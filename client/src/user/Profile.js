import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";

import { read, update, updateUser } from "./apiUser";

const Profile = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { token } = isAutenticated();
  const { name, email, password, error, success } = values;
  const init = (userId) => {
    read(userId, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...data, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
        });
      }
    });
  };
  useEffect(() => {
    init(props.match.params.userId);
    // eslint-disable-next-line
  }, []);
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    update(props.match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          //backend is updated so need to update localStorage
          //so user don't need to sign out and sign in to see the changes
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };
  const profileUpdate = (name, email, password) => {
    return (
      <form action="">
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Name
          </label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Email
          </label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange("password")}
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };
  return (
    <Layout
      title="Profile"
      description="Update ypur profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
