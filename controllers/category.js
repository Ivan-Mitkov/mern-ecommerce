const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHadler");

//Get category, so we get categoryId as param
// which make middleware run and save category in req.category
exports.read = (req, res) => {
  //don't send the photo
  return res.json(req.category);
};
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};
exports.categoryById = (req, res, next, id) => {
  //id is from params
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "Category does not exists" });
    }
    //if there is category save it in req object
    req.category = category;
    // console.log("Category", category);
    return next();
  });
};
