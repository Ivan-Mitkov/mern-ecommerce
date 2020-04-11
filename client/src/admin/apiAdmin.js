import { API } from "../config";

//need to be admin so we are sending userId and token
//router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
export const createCategory = (userId,token,category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`
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