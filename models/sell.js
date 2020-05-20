const shortid  = require('shortid')
const db = require('../database/db')

const save = (sellInfo) => {
  const id = shortid.generate()

  sellInfo.createdAt = new Date()

  db.get('sell').push({id, ...sellInfo}).write()

  return findById(id)
}

const all = () => {
  let sold = db.get('sell').value()

  return sold.length ? sold : []
}

const findById = (id) => {
  let sold = db.get('sell').find({id}).value()

  return sold || null
}

module.exports = {
  save,
  all,
}