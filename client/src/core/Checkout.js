import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import { isAutenticated } from "../auth";

const Checkout = ({ products }) => {
  //https://www.npmjs.com/package/braintree-web-drop-in-react
  const [data, setData] = useState({
    loading: false,
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
        setData({ clientToken: data.clientToken });
      }
    });
  };

  const buy = () => {
    let deliveryAddress = data.address;
    //nonce = data.instance.requestPaymentMethod()
    //send the nonce to the server
    setData({ ...data, loading: true });

    let nonce = null;
    let getNonce = data.instance.requestPaymentMethod().then((data) => {
      console.log(data);
      nonce = data.nonce;
      // //once we have nonce (card type, card number) send nonce as 'paymentMethodNonce'
      // //send total to be charged
      // console.log(
      //   "send nonce and total to process",
      //   nonce,
      //   getTotal(products)
      // );
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log(response);
          //create order
          const createOrderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            address: deliveryAddress,
          };
          createOrder(userId, token, createOrderData).then((response) => {
            //empty cart
            emptyCart(() => {
              console.log("payment success, cart empty");
              setData({ ...data, loading: false, success: true });
            });
          });
        })
        .catch((err) => {
          console.log(err);
          setData({ ...data, error: err.message, loading: false });
        });
    });
  };

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              //https://sandbox.braintreegateway.com/merchants/5fwrc8hyqph4kmpr/paypal
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <div className="gorm-group mb-3">
            <label htmlFor="" className="text-muted">
              Delivery Address
            </label>
            <textarea
              className="form-control"
              value={data.address}
              placeholder="Delivery Address"
              onChange={handleAddress}
              rows="3"
            />
          </div>
          <button onClick={buy} className="btn btn-success btn-block">
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
    console.log("state.data: ", data);
  }, [data]);

  const getTotal = () => {
    const sum = products.reduce((c, n) => {
      return c + parseFloat(n.count) * parseFloat(n.price);
    }, 0);
    return parseFloat(sum.toFixed(2));
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
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Thanks! Your payment was successfull
      </div>
    );
  };
  const showLoading = (loading) => {
    return loading && <h2>Loading...</h2>;
  };
  return (
    <div>
      <h2>Total :{getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
