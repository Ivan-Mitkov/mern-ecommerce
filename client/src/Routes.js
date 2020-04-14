import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute component={Dashboard} exact path="/user/dashboard" />
        <AdminRoute component={AdminDashboard} exact path="/admin/dashboard" />
        <AdminRoute component={AddCategory} exact path="/create/category" />
        <AdminRoute component={AddProduct} exact path="/create/product" />
        <Route exact path="/product/:productId" component={Product} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
