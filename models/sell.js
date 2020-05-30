const shortid  = require('shortid')
const db = require('../database/db')
const DateHelper = require('../utils/date')
const { ITEM_PER_PAGE } = require('../utils/constant')

const save = (sellInfo) => {
  const id = shortid.generate()

  sellInfo.createdAt = DateHelper.generateTodayDate()

  db.get('sell').push({id, ...sellInfo}).write()

  return findById(id)
}

const update = (id, product) => {
  db.get('sell').find({id}).assign({...product}).write()

  return findById(id)
}

const remove = (id) => {
  let removed = db.get('sell').remove({ id }).write()

  return !!removed.length
}

const paginate = (page = 0) => {
  if (!page || page === 1) {
    return db.get('sell').slice(-ITEM_PER_PAGE).value()  
  }

  let sold = db.get('sell')
    .slice(page * -ITEM_PER_PAGE, (page * -ITEM_PER_PAGE) + ITEM_PER_PAGE)
    .value()

  return sold.length ? sold : []
}

const paginateRaw = () => {
  return db.get('sell').value()  
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
  paginateRaw,
  findById,
  remove,
  update,
}