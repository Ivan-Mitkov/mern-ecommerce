import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import Layout from "./Layout";
import Card from "./Card";
import { getBraintreeClientToken, getProducts } from "./apiCore";
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
  const buy = () => {
    //nonce = data.instance.requestPaymentMethod()
    //send the nonce to the server
    let nonce = null;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        //once we have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        //send total to be charged
        console.log(
          "send nonce and total to process",
          nonce,
          getTotal(products)
        );
      })
      .catch((err) => {
        console.log(err);
        setData({ ...data, error: err.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success">
            Checkout
          </button>
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
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  return (
    <div>
      <h2>Total :{getTotal()}</h2>
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
