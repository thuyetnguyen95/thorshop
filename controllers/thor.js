const md5 = require('md5')
const authModel = require('../models/auth')

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
    res.render('thor/category/index')
  },
  
  createCategory: (req, res) => {
    res.render('thor/category/create')
  },
  
  storeCategory: (req, res) => {
    res.redirect('thor/category/index')
  },
  
  editCategory: (req, res) => {
    res.render('thor/category/edit')
  },
  
  updateCategory: (req, res) => {
    res.redirect('thor/category/index')
  },
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