const Sell = require('../../models/sell')
const Product = require('../../models/product')
const { generateTodayDate, getFristDayWeek, getFristDayLastWeek } = require('../../utils/date')


module.exports = {
  index: (req, res) => {
    let totalInDebt = Sell.getTotalInDebt()
    let totalRevenue = Sell.getTotalRevenue()
    let totalProductOOS = Product.totalProductOOS()
    let totalAlmostOver = Product.totalProductAlmostOver()
    let today = generateTodayDate(false)
    let revenueThisWeek = Sell.getRevenueWithRange(getFristDayWeek())
    let revenueLastWeek = Sell.getRevenueWithRange(getFristDayLastWeek())
    
    res.render('thor/index', {
      totalInDebt,
      totalProductOOS,
      totalAlmostOver,
      totalRevenue,
      revenueThisWeek: JSON.stringify(revenueThisWeek),
      revenueLastWeek: JSON.stringify(revenueLastWeek),
      today,
    })
  }
}
