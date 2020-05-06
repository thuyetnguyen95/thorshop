const db = require('../database/db')

const findUser = (username) => {
  console.log(username)
  
  return db.get('admin').find({ username: username }).value()
}

const something = () => {
  let x = db.get('admin').value()
  console.log('x ', x)
}

module.exports = {
  findUser,
  something
}