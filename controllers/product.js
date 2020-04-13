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
//Get product photo as middleware
exports.showPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  return next();
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
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ data });
    });
};

//find products based on req.product.category
exports.listRelated = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let category = req.product.category;
  //find all related products exept this in req.product
  Product.find({ _id: { $ne: req.product }, category })
    .select("-photo")
    .populate("category", "_id name")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ data });
    });
};

//find all categories
exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, data) => {
    if (err) {
      console.log("Cat");
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }

      res.json({
        size: data.length,
        data,
      });
    });
};


exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // if we get search assign search value to query.name
  if (req.query.search) {
    //https://docs.mongodb.com/manual/reference/operator/query/regex/
      query.name = { $regex: req.query.search, $options: 'i' };
      // assign category value to query.category
      if (req.query.category && req.query.category != 'All') {
          query.category = req.query.category;
      }
      // find the product based on query object with 2 properties
      // search and category
      Product.find(query, (err, products) => {
          if (err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          res.json(products);
      }).select('-photo');
  }
};
