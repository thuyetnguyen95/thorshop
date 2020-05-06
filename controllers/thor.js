const authModel = require('../models/auth')

const showLogin = (req, res) => {
  let admin = authModel.something()
console.log(admin)
  res.render('thor/auth/login');
}

const login = (req, res) => {
  let admin = authModel.findUser(req.body.username)
console.log(admin)
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