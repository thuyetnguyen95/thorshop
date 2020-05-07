const authModel = require('../models/auth')

/**
 * Verify user authenticated
 */
module.exports.auth = (req, res, next) => {
  let username = req.signedCookies.userIdentification || ''

  if (!username) return res.redirect('/thor/login')

  let admin = authModel.findUserByUsername(username)
  if (!admin)  return res.redirect('/thor/login')

  res.locals.admin = admin

  return next()
}

/**
 * Verify user is logged in
 */
module.exports.isLoggedIn = (req, res, next) => {
  let username = req.signedCookies.userIdentification || ''
  if (!username) return next()

  let admin = authModel.findUserByUsername(username)
  if (!admin)  return next()

  return res.redirect('/thor')
}