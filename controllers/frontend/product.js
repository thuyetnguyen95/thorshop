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
    let categoryId = req.params.id || ''
    let productCategories = Product.getProductWithCategory()
    let categories = Category.all()
    let products = Product.all()
    
    if (categoryId) {
      products = products.filter(products => products.categoryId === categoryId)
    }
    
    let categoryName = ''
    if (categoryId) {
      let x = categories.filter(item => item.id === categoryId)
      categoryName = x.length ? x[0].name : ''
    }

    res.render('shop/products', { productCategories, products, categories, categoryName });
  },

  promotion: (req, res) => {
    res.render('shop/promotion');
  },

  contact: (req, res) => {
    res.render('shop/contact');
  },
}