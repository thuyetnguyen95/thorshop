const md5 = require('md5')
const authModel = require('../models/auth')
const Category = require('../models/category')
const Product = require('../models/product')

// Auth routes
const showLogin = (req, res) => {
  res.render('thor/auth/login')
}

const login = (req, res) => {
  let admin = authModel.findUserByUsername(req.body.username)
  if(!admin) {
    return res.render('thor/auth/login', {
      errors: ["Oops! It looks like you forgot something :)"]
    })
  }

  let password = md5(req.body.password || '')
  if (password !== admin.password) {
    return res.render('thor/auth/login', {
      errors: ["Oops! It looks like you forgot something :) haha"]
    })
  }

  res.cookie('userIdentification', admin.username, { signed: true })
  res.redirect('/thor')
}

// Master routes
const index = (req, res) => {
  res.render('thor/index')
}

// Category routes
const categoryRoutes = {
  indexCategory: (req, res) => {
    const categories = Category.all()

    res.render('thor/category/index', { categories })
  },
  
  createCategory: (req, res) => {
    res.render('thor/category/create')
  },
  
  storeCategory: (req, res) => {
    let name = req.body.name || ''
    if (!name) return res.redirect('thor/category/create')

    let category = Category.save(name)

    return category ? res.redirect('/thor/category') : res.redirect('/thor/category/create')
  },
  
  editCategory: (req, res) => {
    let id = req.params.id || ''
    
    let category = Category.findById(id)
    if (!category) {
      return res.redirect('/thor/category')
    }

    return res.render('thor/category/edit', {category})
  },
  
  updateCategory: (req, res) => {
    let id = req.params.id || ''
    let name = req.body.name || ''

    if (!id || !name) {
      res.redirect('/thor/category')
    }

    let category = Category.update(id, name)

    // if (!category) {
    //   const error = 'Oops! có vẻ không update được rồi @@'

    //   res.redirect('/thor/category')
    // }

    res.redirect('/thor/category')
  },

  deleteCategory: (req, res) => {
    let id = req.params.id || ''

    const products = Product.findByCategoryId(id)
    if (products.length) {
      let error = 'Oops! Bạn không thể xóa cái này đâu :('

      return res.redirect('/thor/category')  
    }

    //TODO: implement fail case
    Category.remove(id)

    return res.redirect('/thor/category')
  }
}

// Product routes
const product = (req, res) => {
  res.render('thor/product/index')
}

module.exports = {
  index,
  login,
  showLogin,
  product,
  ...categoryRoutes,
}