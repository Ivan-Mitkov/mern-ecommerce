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
exports.read = (req, res, next) => {
  //not sending hashed password and salt
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
exports.update = (req, res, next) => {
  
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({ error: "Not Authorized" });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};
