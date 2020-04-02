const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHadler");

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
    if (!name || !description || !price || !quantity || !shipping || !category) {
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
