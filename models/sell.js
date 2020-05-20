const shortid  = require('shortid')
const db = require('../database/db')

const save = (sellInfo) => {
  const id = shortid.generate()

  sellInfo.createdAt = new Date()

  db.get('sell').push(sellInfo).write()

  return findById(id)
}

const all = () => {
  let sold = db.get('sell').value()

  return sold.length ? sold : []
}

module.exports = {
  save,
  all,
}