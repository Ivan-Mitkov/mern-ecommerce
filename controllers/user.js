const User = require("../models/User");
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
