const express = require("express");
const router = express.Router();
const { create } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//only admin can create new category
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
//when we have param "userId" we run this middleware and save user in req.profile
router.param("userId", userById);
module.exports = router;
