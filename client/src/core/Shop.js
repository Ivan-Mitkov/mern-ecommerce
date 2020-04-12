import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkbox from "./Checkbox";
import { getCategories } from "./apiCore";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data.data);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
            <h4>Filter by categories</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div className="col-8">Right</div>
      </div>
    </Layout>
  );
};

export default Shop;
