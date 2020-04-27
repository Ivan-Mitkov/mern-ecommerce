const { Order, CartItem } = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHadler");

exports.create = (req, res) => {
  // console.log('CREATE ORDER',req.body)
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};
