import { API } from "../config";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //can't send js object
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //can't send js object
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const authenticate = (data, cb) => {
  //check if we got windows object
  //local storage is property of browser windows
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    cb();
  }
};

export const signout = (cb) => {
  //1.remove token
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    //3.redirect
    cb();
    //2.make call to backend
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout", response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};