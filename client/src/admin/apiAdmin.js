import { API } from "../config";

//need to be admin so we are sending userId and token
//router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //can't send js object
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    //can't send js object
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
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
//router.get("/order/list/:userId", list);
export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
//router.get("/order/status-values/:userId", list);
export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all products
//router.get("/product", list);
export const getProducts = () => {
  return fetch(`${API}/product?limit=undefined`, {
    method: "GET",  
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//get single product
//router.get("/product/:productId", read);
export const getSingleProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete product
//router.delete("/product/:productId/:userId",requireSignin,isAuth, isAdmin,remove);
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//router.put(  "/product/:productId/:userId",  requireSignin,  isAuth,  isAdmin,  update);
export const updateProduct = (productId,userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    //can't send js object
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
