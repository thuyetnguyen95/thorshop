const shortid  = require('shortid')
const db = require('../database/db')

const save = (name) => {
  const id = shortid.generate()
  db.get('products').push({id, name}).write()

  return findById(id)
}

const all = () => {
  let categories = db.get('products').value()

  return categories.length ? categories : []
}

const update = (id, name) => {
  db.get('products').find({id}).assign({name}).write()

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