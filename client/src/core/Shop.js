import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { getCategories, getFilteredProducts } from "./apiCore";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
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
    //show initial search results when page mounts
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  //sending filters to the backend
  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    //get results from backend
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data);
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  //pagination
  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      // console.log("data", filteredResults);
      if (data.error) {
        setError(data.error);
      } else {
        //load all
        // setFilteredResults([...filteredResults, ...data.data]);
        // load next page
        setFilteredResults([...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    // console.log(size," ", limit)
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };
  //format data from price array, extract data using key
  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    // FORMAT: {
    //     _id: 0,
    //     name: "Any",
    //     array: [],
    //   }
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, " ", filterBy);
    //get filters from state and made new object
    const newFilters = { ...myFilters };
    //user pass filters from checkbox
    //write the filters in the newFilters
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      //get value of the array using it's key and save the array in state
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    //change state
    setMyFilters(newFilters);
    //this filter object will be send to the backend
  };
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
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by price range</h4>{" "}
          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
        <div className="col-8">
          {" "}
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults &&
              filteredResults.map((product, i) => (
                <Card key={product._id} product={product} />
              ))}
          </div>
          {loadMoreButton()}
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
