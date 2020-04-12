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