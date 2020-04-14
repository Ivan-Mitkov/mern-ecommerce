import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { read } from "./apiCore";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  const loadSingleProduct = (productId) => {
    //get single product from API
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };
  useEffect(() => {
    //get product id from props from router
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    console.log(product);
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <Layout
      title={`${product.name || "Product Name"}`}
      description={`${
        (product.description &&
          product.description.split(" ").slice(0, 10).join(" ")) ||
        "Product description"
      }`}
      className="container-fluid"
    >
     
      <div className="row">{product.description&&<Card product={product}/>}</div>
    </Layout>
  );
};

export default Product;
