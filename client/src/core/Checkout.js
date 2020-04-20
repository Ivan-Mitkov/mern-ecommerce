import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import Layout from "./Layout";
import Card from "./Card";
import { getBraintreeClientToken } from "./apiCore";
import { isAutenticated } from "../auth";

const Checkout = ({ products }) => {
  //https://www.npmjs.com/package/braintree-web-drop-in-react
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  //need to pass userId and token to getBraintreeToken
  const userId = isAutenticated() && isAutenticated().user._id;
  const token = isAutenticated() && isAutenticated().token;
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  const showDropIn = () => (
    <div>
      {data.clientToken && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success">Checkout</button>
        </div>
      ) : null}
    </div>
  );

  useEffect(() => {
    getToken(userId, token);
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const getTotal = () => {
    return products.reduce((c, n) => {
      return c + n.count * n.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAutenticated() ? (
    <div >{showDropIn()}</div>
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
