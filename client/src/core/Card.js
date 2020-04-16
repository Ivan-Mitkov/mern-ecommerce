import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";

const Card = ({ product, hideViewProductButton }) => {
  const [redirect, setRedirect] = useState(false);

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
  const showAddtoCardButton = () => {
    return (
      <Link to="/">
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to cart
        </button>
      </Link>
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
        {showAddtoCardButton()}
      </div>
    </div>
  );
};

export default Card;
