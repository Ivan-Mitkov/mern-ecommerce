import { API } from "../config";

export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
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

//update in backend
export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update in local storage
export const updateUser = (user, cb) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      cb();
    }
  }
};

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      // console.log(response.json())
      return response.json();
    })
    .catch((err) => console.log(err));
};
