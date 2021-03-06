const User = require("../models/User");
const {Order} = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHadler");

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

//middleware save user in req object so when there is userId we are reading user from req
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
exports.addOrderToUserHistory = (req, res, next) => {
  const history = [];
  req.body.order.products.forEach((p) =>
    history.push({
      _id: p._id,
      name: p.name,
      description: p.description,
      category: p.category,
      quantity: p.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    })
  );
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(orders);
    });
};
