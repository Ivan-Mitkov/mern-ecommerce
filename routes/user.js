const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { requireSignin,isAuth,isAdmin } = require("../controllers/auth");

//when we have param "userId" we run this middleware and save user in req.profile
router.param("userId", userById);

//test route
router.get("/secret/:userId", requireSignin,isAuth,isAdmin, (req, res) => {
  res.json({ user: req.profile });
});
module.exports = router;
