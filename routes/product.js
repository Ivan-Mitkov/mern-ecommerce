const express = require("express");
const router = express.Router();
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  showPhoto,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
//only admin can create new category
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/product/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.get("/product", list);
// route - make sure its post
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", showPhoto);
//home page search
router.get("/products/search", listSearch);

//MIDDLEWARES
//when we have param "userId" we run this middleware and save user in req.profile
router.param("userId", userById);
//when we have param "productId" we run this middleware and save user in req.product
router.param("productId", productById);

module.exports = router;
