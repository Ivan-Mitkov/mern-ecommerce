import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutenticated } from "../auth";
// import { createBrowserHistory } from "history";

const Menu = ({ history }) => {
  //   const history = createBrowserHistory();
  const isActive = (history, path) => {
    //https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md
    if (history.location.pathname === path) {
      return { color: "#ff9900" };
    }
    return { color: "#ffffee" };
  };

  const handleSignout = () =>
    signout(() => {
      history.push("/");
    });

  const privateRoutes = () => {
    if (!isAutenticated()) {
      return (
        <>
          <li>
            <Link
              className="nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Signin
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Signup
            </Link>
          </li>
        </>
      );
    }
    return (
      <li>
        <span
          className="nav-link"
          style={{ cursor: "pointer", color: "#ffffee" }}
          onClick={handleSignout}
        >
          Signout
        </span>
      </li>
    );
  };
  const adminRoutes = () => {
    if (isAutenticated() && isAutenticated().user.role === 1) {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        </>
      );
    } else if(isAutenticated()) {
      return (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
            Shop
          </Link>
        </li>
        {privateRoutes()}
        {adminRoutes()}
      </ul>
    </nav>
  );
};

export default withRouter(Menu);
