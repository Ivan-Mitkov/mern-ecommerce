const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHadler");

//Middleware to save product in req object, like user
exports.productById = (req, res, next, id) => {
  //id is from params
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: "Product not found" });
    }
    //if there is product save it in req object
    req.product = product;
    return next();
  });
};

//Get product, so we get productId as param
// which make middleware run and save product in from req.product
exports.read = (req, res) => {
  //don't send the photo
  req.product.photo = undefined;
  return res.json(req.product);
};

//Get product and user from Middlewares because every time when there is productId and userId
//in params middlewares run
exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ msg: "Product deleted" });
  });
};
exports.update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    //check for all fields
    const { name, description, price, quantity, shipping, category } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !shipping ||
      !category
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //Get product from req object
    let product = req.product;
    //put all data using lodash extend we can use {...} but for change
    product = _.extend(product, fields);

    //photo is the name we send files from client if we named them image it will be files.image
    if (files.photo) {
      console.log("Photo size: ", files.photo.size);
      //size in bites
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "Image should be less than 1MB" });
      }
      //this is from Product Model getting files from client side
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    //now save the product
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ data });
    });
  });
};

exports.create = (req, res) => {
  // https://www.npmjs.com/package/formidable

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    //check for all fields
    const { name, description, price, quantity, shipping, category } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !shipping ||
      !category
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product(fields);
    //photo is the name we send files from client if we named them image it will be files.image
    if (files.photo) {
      console.log("Photo size: ", files.photo.size);
      //size in bites
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "Image should be less than 1MB" });
      }
      //this is from Product Model getting files from client side
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    //now save the product
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ data });
    });
  });
};

/*
sort products by query params sell/arival

/product?sortBy=sold&order=desc&limit=4
/product?sortBy=createdAt&order=desc&limit=4
if no params are sent all products are returned
*/

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("Category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ data });
    });
};
