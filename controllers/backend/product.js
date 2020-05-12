const Product = require('../../models/product')
const Category = require('../../models/category')

const uploadModule = require('../../utils/upload')

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
    let uploadFile = uploadModule.single('image')

    uploadFile(req, res, (error) => {
      if (error) {
        console.log(`Error: ${error}`)

        return res.redirect('/thor/product/create')
      } else {
        let categoryId = req.body.categoryId || ''
        let name = req.body.name || ''
        let stock = parseInt(req.body.stock || 0)
        let price = parseInt(req.body.price || 1000)
        let expiryAt = req.body.expiryAt || generateExpiryDate()
        let image = req.body.fileUploadName
        
        if (!name) return res.redirect('/thor/product/create')

        let product = Product.save({ name, stock, price, expiryAt, categoryId, image })

        return product ? res.redirect('/thor/product') : res.redirect('/thor/product/create')
      }
    })
  },
  
  editProduct: (req, res) => {
    const categories = Category.all()
    if (!req.params.id) {
      return res.redirect('/thor/product')
    }

    const product = Product.findById(req.params.id)

    res.render('thor/product/edit', {categories, product})
  },
  
  updateProduct: (req, res) => {
    let categoryId = req.body.categoryId || ''
    let id = req.params.id || ''
    let name = req.body.name || ''
    let stock = parseInt(req.body.stock || 0)
    let price = parseInt(req.body.price || 1000)
    let expiryAt = req.body.expiryAt || generateExpiryDate()
    // let image = req.body.fileUploadName
    
    if (!name) return res.redirect('/thor/product/product')

    let product = Product.update(id, { name, stock, price, expiryAt, categoryId })

    return product ? res.redirect('/thor/product') : res.redirect('/thor/product/edit/' + id)
  },

  deleteProduct: (req, res) => {
    
  }
}
