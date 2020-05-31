const shortid  = require('shortid')
const db = require('../database/db')
const DateHelper = require('../utils/date')
const { AMOUNT_OF_WARNING } = require('../utils/constant')

const save = (product) => {
  const id = shortid.generate()
  
  product.addedAt = DateHelper.generateTodayDate()
  product.sold = 0

  db.get('products').push({id, ...product}).write()

  return findById(id)
}

const all = () => {
  let products = db.get('products').value()

  return products.length ? products : []
}

const update = (id, product) => {
  db.get('products').find({id}).assign({...product}).write()

  return findById(id)
}

const remove = (id) => {
  let removed = db.get('products').remove({ id }).write()

  return !!removed.length
}

const findById = (id) => {
  let product = db.get('products').find({id}).value()

  return product || null
}

const findByCategoryId = (categoryId) => {
  let products =  db.get('products').filter({categoryId}).value()

  return products || []
}

const sold = (id, qty) => {
  let product = findById(id)
  
  if (!product) return

  product.stock -= qty
  product.sold += qty

  return update(id, product)
}

const totalProductOOS = () => { //out of stock
  let countOOS = db.get('products')
  .filter(o => o.stock === 0)
  .value()

  return countOOS.length || 0
}

const totalProductAlmostOver = () => {
  let count = db.get('products')
  .filter(o => o.stock <= AMOUNT_OF_WARNING && o.stock > 0)
  .value()

  return count.length || 0
}

module.exports = {
  save,
  all,
  update,
  remove,
  findById,
  findByCategoryId,
  sold,
  totalProductOOS,
  totalProductAlmostOver,
}