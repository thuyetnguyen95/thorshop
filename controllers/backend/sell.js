const Category = require("../../models/category");
const Product = require("../../models/product");

module.exports = {
  indexSell: (req, res) => {
    let products = Product.all()

    res.render("thor/sell/index", {
      products
    });
  },

  storeSell: (req, res) => {
    let totalPrice = req.body.total_price
    let pay = req.body.pay
    let inDebt = req.body.in_debt
    let note = req.body.note
    let productInfo = req.body.productInfo

    console.log(req.body)

  },

  // storeCategory: (req, res) => {

  // },

  // editCategory: (req, res) => {

  // },

  // updateCategory: (req, res) => {

  // },
  // deleteCategory: (req, res) => {

  // }
};