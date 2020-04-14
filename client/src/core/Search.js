import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories } = data;
  //Get categoties from backend and save them in state
  const loadCategories = () => {
    getCategories().then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setData({ ...data, categories: result.data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   console.log(data);
  //   console.log(data.results);
  // }, [data]);

  const handleChange = (name) => (event) => {
    // console.log(data);
    // console.log(event.target.value, " ", name);
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    // console.log(search || "S", category || "C");
    if (data.search) {
      list({ search: data.search || undefined, category: data.category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );
  const searchMessage = (searched, results = []) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">
          {searchMessage(data.searched, data.results)}
        </h2>

        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">
        {searchedProducts(data.results)}
      </div>
    </div>
  );
};

export default Search;
