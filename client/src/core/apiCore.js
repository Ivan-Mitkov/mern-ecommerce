import { API } from "../config";
import queryString from "query-string";

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
// router.get("/product/productId", list);
export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
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

//router.get("/products/search", listSearch);
export const list = (params) => {
  const query = queryString.stringify(params);
  // console.log("query", query);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => new Error(err));
};

//router.get("/product/related/:productId", listRelated);
export const listRelated = (productId) => {
  return fetch(`${API}/product/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
