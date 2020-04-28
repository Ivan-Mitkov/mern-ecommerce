const { Order, CartItem } = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHadler");

exports.orderById = (req, res, next, id) => {
  //find order in db
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      //make order available in req object
      req.order = order;
      console.log("STATUS: ", req.order.status);
      next();
    });
};
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

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(order);
    }
  );
};
