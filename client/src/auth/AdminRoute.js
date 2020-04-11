import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutenticated } from "./index";

//https://reacttraining.com/react-router/web/example/auth-workflow
const AdminRoute = ({ component: Component, ...rest }) => {
  const isAdmin = () => {
    return isAutenticated() && isAutenticated().user.role === 1;
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
