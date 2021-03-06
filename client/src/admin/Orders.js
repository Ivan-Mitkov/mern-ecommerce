import React, { useState, useEffect } from "react";
import moment from "moment";
import Layout from "../core/Layout";
import { isAutenticated } from "../auth/index";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAutenticated();
  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);
  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No Orders</h1>;
    }
  };
  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-3">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    );
  };

  const handleStatusChange = (event, orderId) => {
      console.log(event.target.value)
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      (data) => {
        if (data.error) {
          console.log("Status update failed");
          return;
        } else {
          loadOrders();
        }
      }
    );
  };
  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status:{o.status}</h3>
        <select
          className="form-control"
          name='status'
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, i) => {
            return (
              <option key={i} value={status} name={status}>
                {status}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const showOrders = () => {
    // console.log(orders);
    const ordersList = orders.map((order, i) => {
      return (
        <div
          className="mt-5"
          key={i}
          style={{ borderBottom: "5px solid indigo" }}
        >
          <h2 className="mb-5">
            <span className="bg-primary">Order Id: {order._id}</span>
          </h2>
          <ul className="list-group mb-2">
            <li className="list-group-item">Status: {showStatus(order)}</li>
            <li className="list-group-item">
              Transaction Id: {order.transaction_id}
            </li>
            <li className="list-group-item">Amount: {order.amount}</li>
            <li className="list-group-item">Ordered by: {order.user.name}</li>
            <li className="list-group-item">
              Ordered on: {moment(order.createdAt).fromNow()}
            </li>
            <li className="list-group-item">
              Delivery address: {order.address}
            </li>
          </ul>
          <h3 className="mt-4 mb-4 font-italic">
            Total products in the order: {order.products.length}
          </h3>
          {order.products &&
            order.products.map((product, i) => {
              return (
                <div
                  className="mb-4"
                  key={product._id}
                  style={{ padding: "20px", border: "1px solid indigo" }}
                >
                  {showInput("Product name", product.name)}
                  {showInput("Product price", product.price)}
                  {showInput("Product total", product.count)}
                  {showInput("Product Id", product._id)}
                </div>
              );
            })}
        </div>
      );
    });
    return ordersList;
  };
  return (
    <Layout title="Orders" description={`Good day ${user.name}, manage orders`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {showOrders()}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
