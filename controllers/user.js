const User = require("../models/User");

exports.userById = (req, res, next, id) => {
  //using callback nost async await or promises - just for exercise
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    //save user too req object
    req.profile = user;
    next();
  });
};
