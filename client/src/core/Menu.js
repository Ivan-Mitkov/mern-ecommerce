import React from "react";
import { Link, withRouter } from "react-router-dom";
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
  return (
    <nav>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default withRouter(Menu);
