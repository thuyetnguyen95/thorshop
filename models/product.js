const shortid  = require('shortid')
const db = require('../database/db')

const save = (product) => {
  const id = shortid.generate()
  
  product.addedAt = new Date()

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

const findById = (id) => {
  let product = db.get('products').find({id}).value()

  return product || null
}

const findByCategoryId = (categoryId) => {
  let products =  db.get('products').filter({categoryId}).value()

  return products || []
}

module.exports = {
  save,
  findById,
  all,
  update,
  findByCategoryId,
}