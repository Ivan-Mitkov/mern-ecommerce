import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { read, listRelated } from "./apiCore";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  //first we need to fetch Single product in order to find productId, then fetch related
  const loadSingleProduct = (productId, cb) => {
    //get single product from API
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        cb(data);
      }
    });
  };

  const listRealtedProducts = (product) => {
    //fetch related products
    listRelated(product._id).then((related) => {
      if (related.error) {
        setError(related.error);
      } else {
        setRelatedProducts(related.data);
      }
    });
  };
  useEffect(() => {
    //get product id from props from router
    const productId = props.match.params.productId;
    loadSingleProduct(productId, listRealtedProducts);
    console.log(product);
    // eslint-disable-next-line
  }, [props.match.params.productId]);
  
  useEffect(() => {
    console.log(relatedProducts);
    // eslint-disable-next-line
  }, [relatedProducts]);

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
      <div className="row">
        <div className="col-8">
          {product.description && (
            <Card product={product} hideViewProductButton={true} />
          )}
        </div>
        <div className="col-4">
          {relatedProducts.map((rel) => {
            return (
              <div key={rel._id} className="mb-3">
                <Card product={rel} />;
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
