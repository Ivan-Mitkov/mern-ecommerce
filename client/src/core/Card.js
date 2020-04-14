import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  
  return (
   
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {/* router.get("/product/photo/:productId", showPhoto); */}
          <ShowImage item={product} url="product" />
          <p>{product.description.split(" ").slice(0, 10).join(" ")}</p>
          <p>${product.price}</p>
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-warning mt-2 mb-2">
              Add to cart
            </button>
          </Link>
        </div>
      </div>
   
  );
};

export default Card;
