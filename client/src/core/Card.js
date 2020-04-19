import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  hideViewProductButton,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddtoCard = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Link to="/">
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2"
          >
            Add to cart
          </button>
        </Link>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Link to="/cart">
          <button
            onClick={() => {
              removeItem(product._id);
              setRun(!run); // run useEffect in parent Cart
            }}
            className="btn btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </Link>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const viewProduct = (productId) => {
    const linkInButton = (
      <Link to={`/product/${productId}`}>
        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Product
        </button>
      </Link>
    );
    return hideViewProductButton ? null : linkInButton;
  };

  const handleCountChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleCountChange(product._id)}
          />
        </div>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        {/* router.get("/product/photo/:productId", showPhoto); */}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">
          {product.description.split(" ").slice(0, 10).join(" ")}
        </p>
        <p className="black-10">${product.price}</p>
        <p className="black-8">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on: {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}
        <br />

        {viewProduct(product._id)}
        {showAddtoCard(showAddToCartButton)}
        {showCartUpdateOptions(cartUpdate)}
        {showRemoveButton(showRemoveProductButton)}
      </div>
    </div>
  );
};

export default Card;
