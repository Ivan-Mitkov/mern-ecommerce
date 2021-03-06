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
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Profile from "./user/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute component={Dashboard} exact path="/user/dashboard" />
        <PrivateRoute component={Profile} exact path="/profile/:userId" />
        <AdminRoute component={AdminDashboard} exact path="/admin/dashboard" />
        <AdminRoute component={AddCategory} exact path="/create/category" />
        <AdminRoute component={AddProduct} exact path="/create/product" />
        <AdminRoute
          component={UpdateProduct}
          exact
          path="/admin/product/update/:productId"
        />
        <AdminRoute component={ManageProducts} exact path="/admin/products" />
        <AdminRoute component={Orders} exact path="/admin/orders" />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
