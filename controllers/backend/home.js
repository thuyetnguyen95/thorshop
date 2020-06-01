const Sell = require('../../models/sell')
const Product = require('../../models/product')

module.exports = {
  index: (req, res) => {
    let totalInDebt = Sell.getTotalInDebt()
    let totalRevenue = Sell.getTotalRevenue()
    let totalProductOOS = Product.totalProductOOS()
    let totalAlmostOver = Product.totalProductAlmostOver()

    /**
     * TODO: change to real data
     */
    let revenueData = JSON.stringify([50000, 33000, 115000, 78000, 35000, 55000])

    res.render('thor/index', {
      totalInDebt,
      totalProductOOS,
      totalAlmostOver,
      totalRevenue,
      revenueData
    })
  }
}
