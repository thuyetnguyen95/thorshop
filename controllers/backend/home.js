const Sell = require('../../models/sell')
const Product = require('../../models/product')

module.exports = {
  index: (req, res) => {
    let totalInDebt = Sell.getTotalInDebt()
    let totalRevenue = Sell.getTotalRevenue()
    let totalProductOOS = Product.totalProductOOS()
    let totalAlmostOver = Product.totalProductAlmostOver()

    res.render('thor/index', { totalInDebt, totalProductOOS, totalAlmostOver, totalRevenue })
  }
}