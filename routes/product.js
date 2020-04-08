const express = require("express");
const router = express.Router();
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated
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
router.get("/product", list);
router.get("/product/related/:productId", listRelated);

//MIDDLEWARES
//when we have param "userId" we run this middleware and save user in req.profile
router.param("userId", userById);
//when we have param "productId" we run this middleware and save user in req.product
router.param("productId", productById);
module.exports = router;
