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

export const authenticate=(data, cb)=>{
  //check if we got windows object 
  //local storage is property of browser windows 
  if(typeof window!==undefined){
    localStorage.setItem('jwt',JSON.stringify(data));
    cb()
  }
}
