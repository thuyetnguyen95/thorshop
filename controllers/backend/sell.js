const Sell = require("../../models/sell");
const Product = require("../../models/product");
const User = require("../../models/user");
const { ITEM_PER_PAGE } = require('../../utils/constant')
const DateHelper = require('../../utils/date')

let totalRecord = 0
let totalPage = 0

function paginate(data, page, status, date) {
  let sold = data

  if (status) {
    sold = sold.filter(item => {
      return status === 1 ? item.inDebt > 0 : item.inDebt <= 0
    })
  }

  if (date) {
    sold = sold.filter(item => {
      return DateHelper.equalDate(item.createdAt, date)
    })
  }

  totalRecord = sold.length
  totalPage = Math.ceil(totalRecord / ITEM_PER_PAGE)

  if (!page || page === 1) {
    sold = sold.slice(-ITEM_PER_PAGE)
  } else {
    sold = sold.slice(page * -ITEM_PER_PAGE, (page * -ITEM_PER_PAGE) + ITEM_PER_PAGE)
  }

  return sold.length ? sold : []
}

module.exports = {
  indexSell: (req, res) => {
    let products = Product.all()
    let users = User.all()

    res.render("thor/sell/index", { products, users });
  },

  storeSell: (req, res) => {
    let totalPrice = parseInt(req.body.total_price || 0)
    let pay = parseInt(req.body.pay || 0)
    let inDebt = parseInt(req.body.in_debt || 0)
    let note = req.body.note
    let userId = req.body.userId
    let productInfo = JSON.parse(req.body.productInfo)

    try {
      productInfo.forEach(product => {
        Product.sold(product.id, product.qty)
      });

      Sell.save({
        userId,
        totalPrice,
        pay,
        inDebt,
        note,
        productInfo,
      })
    } catch (error) {
      console.log(error)
    }

    return res.redirect('/thor/sell')
  },

  indexSold: (req, res) => {
    let keyword = req.query.keyword || ''
    let status = parseInt(req.query.status || 0) || ''
    let date = req.query.date || ''

    // let totalRecord = Sell.totalRecord()
    // let totalPage = Math.ceil(totalRecord / ITEM_PER_PAGE)
    let page = parseInt(req.query.p || 1)
    // page = page > totalPage ? 1 : page
    
    // let sold = Sell.paginate(page)
    let sold = Sell.paginateRaw()
    sold = paginate(sold, page, status, date)

    let products = Product.all()
    let users = User.all()

    res.render("thor/sell/sold", {
      products,
      users,
      sold: [...sold].reverse(),
      totalPage,
      currentPage: page,
      keyword,
      status,
      date
    });
  },

  // editCategory: (req, res) => {

  // },

  // updateCategory: (req, res) => {

  // },
  // deleteCategory: (req, res) => {

  // }
};