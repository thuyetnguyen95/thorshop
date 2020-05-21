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

const generateExpiryDate = () => {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 2)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${y}-${m}-${d}`
}

const getAllProduct = () => {
  let products = Product.all()

  products = products.map(product => {
    let tempProduct = {
      ...product
    }
    tempProduct.status = getProductStatus(tempProduct)

    return tempProduct
  })

  return products
}

module.exports = {
  index: (req, res) => {
    let keyword = req.query.keyword || ''
    let products = getAllProduct()
    products = products.filter(product => product.name.toLowerCase().includes(keyword))

    res.render('shop/index', {
      products,
      keyword
    })
  },

  product: (req, res) => {
    res.render('shop/products');
  },

  promotion: (req, res) => {
    res.render('shop/promotion');
  },

  contact: (req, res) => {
    res.render('shop/contact');
  },
}