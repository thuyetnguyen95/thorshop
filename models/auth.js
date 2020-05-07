const db = require('../database/db')

const findUserByUsername = (username) => {
  return db.get('admin').find({ username: username }).value()
}

module.exports = {
  findUserByUsername,
}