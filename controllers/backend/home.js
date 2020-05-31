const Sell = require('../../models/sell')

module.exports = {
  index: (req, res) => {
    let totalInDebt = Sell.getTotalInDebt()

    res.render('thor/index', { totalInDebt })
  }
}