const User = require("../models/User");
//used to generate signed token
const jwt = require("jsonwebtoken");
//used for authorization check
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHadler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    //NOT sending salt and hashed password
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};
exports.signin = (req, res) => {
  //find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    //if user is found make sure email and password match
    //use authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    //generate a sign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expires: new Date(Date.now() + 900000) });
    //return response with user and token to the frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {

   //from cookie parser
   res.clearCookie('t');
  res.status(200).json({ success: true, data: {} });
};

//must hav cookie parser installed
//protects routes
exports.requireSignin=expressJwt({
secret:process.env.JWT_SECRET,
userProperty:'auth'
})
