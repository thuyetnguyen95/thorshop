const shortid  = require('shortid')
const db = require('../database/db')
const DateHelper = require('../utils/date')

const save = (sellInfo) => {
  const id = shortid.generate()

  sellInfo.createdAt = DateHelper.generateTodayDate()

  db.get('sell').push({id, ...sellInfo}).write()

  return findById(id)
}

const paginate = (page = 0) => {
  if (!page || page === 1) {
    return db.get('sell').slice(-2).value()  
  }

  let sold = db.get('sell')
    .slice(page * -2, (page * -2) + 2)
    .value()

  return sold.length ? sold : []
}

const totalRecord = () => {
  return db.get('sell').size().value() || 0
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
  paginate,
  totalRecord,
}