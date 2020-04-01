const express = require("express");
const router = express.Router();
const { signup,signin,signout,requireSignin } = require("../controllers/user");
// validators
const { runValidation } = require("../validators");
const { userSignupValidator,userSigninValidator } = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout",requireSignin, signout);

module.exports = router;
