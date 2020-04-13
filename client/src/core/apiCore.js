import { API } from "../config";

// router.get("/product", list);
export const getProducts = (sortBy) => {
  return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};

//router.get("/category", list);
export const getCategories = () => {
  return fetch(`${API}/category`, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};

//router.post("/products/by/search", listBySearch);
/*
sort products by query params sell/arival
/product?sortBy=sold&order=desc&limit=4
/product?sortBy=createdAt&order=desc&limit=4
if no params are sent all products are returned
*/
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
