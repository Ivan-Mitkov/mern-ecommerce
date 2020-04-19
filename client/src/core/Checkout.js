import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from "./apiCore";
import { isAutenticated } from "../auth";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((c, n) => {
      return c + n.count * n.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAutenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <h2>Total :{getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
