const authController = require('./backend/auth')
const categoryController = require('./backend/category')
const productController = require('./backend/product')
const sellController = require('./backend/sell')
const homeController = require('./backend/home')

module.exports = {
  ...homeController,
  ...authController,
  ...categoryController,
  ...productController,
  ...sellController,
}