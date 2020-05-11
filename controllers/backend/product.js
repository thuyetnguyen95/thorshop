const Product = require('../../models/product')
const Category = require('../../models/category')

const getProductStatus = (product) => {
  let status = {}

  if (product.stock > 5) {
    status.text = 'Đang còn'
    status.class = 'chip-success'
  } else if (product.stock <= 5 && product.stock > 0) {
    status.text = 'Sắp hết'
    status.class = 'chip-warning'
  } else {
    status.text = 'Hết hàng'
    status.class = 'chip-danger'
  }

  return status
}

module.exports = {
  indexProduct: (req, res) => {
    const products = Product.all() || []
    
    products.map(product => {
      product.status = getProductStatus(product)

      return product
    })

    res.render('thor/product/index', { products })
  },

  createProduct: (req, res) => {
    const categories = Category.all()

    res.render('thor/product/create', { categories })
  },
  
  storeProduct: (req, res) => {
    let categoryId = req.body.categoryId || ''
    let name = req.body.name || ''
    let stock = parseInt(req.body.stock || 0)
    let price = parseInt(req.body.price || 0)
    let expiryAt = Date.parse(req.body.expiryAt) || new Date()
    let image = req.body.fileUploadName

    if (!name) return res.redirect('thor/product/create')

    let product = Product.save({ name, stock, price, expiryAt, categoryId, image })

    return product ? res.redirect('/thor/product') : res.redirect('/thor/product/create')
  },
  
  editProduct: (req, res) => {
    
  },
  
  updateProduct: (req, res) => {
    
  },

  deleteProduct: (req, res) => {
    
  }
}
