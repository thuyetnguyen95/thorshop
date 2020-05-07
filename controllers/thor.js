const md5 = require('md5')
const authModel = require('../models/auth')

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
  res.redirect('/thor');
}

const index = (req, res) => {
  res.render('thor/index');
}

module.exports = {
  index,
  login,
  showLogin,
}