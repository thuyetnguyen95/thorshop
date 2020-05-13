const authController = require('./backend/auth')
const categoryController = require('./backend/category')
const productController = require('./backend/product')
const sellController = require('./backend/sell')

// Home routes
const index = (req, res) => {
  res.render('thor/index')
}

module.exports = {
  index,
  ...authController,
  ...categoryController,
  ...productController,
  ...sellController,
}