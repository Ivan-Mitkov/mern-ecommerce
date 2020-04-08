const express = require("express");
const router = express.Router();
const { create,categoryById,read } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);

//only admin can create new category
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
//when we have param "userId" we run this middleware and save user in req.profile
router.param("userId", userById);
router.param("categoryId", categoryById);
module.exports = router;
