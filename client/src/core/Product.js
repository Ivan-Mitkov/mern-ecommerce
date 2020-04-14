import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from "./apiCore";

const Product = () => {
  return (
    <Layout
      title="FullStack React Node MongoDB Ecommerce App"
      description="Node React E-commerce App"
      className="container-fluid"
    >
    <p>Product page</p>
    </Layout>
  );
};

export default Product;
