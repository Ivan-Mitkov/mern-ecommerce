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
      return res.status(400).json({ error: "Image coul not be uploaded" });
    }
    const product = new Product(fields);
    //photo is the name we send files from client if we named them image it will be files.image
    if (files.photo) {
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
