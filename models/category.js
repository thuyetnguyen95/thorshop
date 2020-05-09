const shortid  = require('shortid')
const db = require('../database/db')

const save = (name) => {
  const id = shortid.generate()
  db.get('category').push({id, name}).write()

  return findById(id)
}

const all = () => {
  let categories = db.get('category').value()

  return categories.length ? categories : []
}

const update = (id, name) => {
  db.get('category').find({id}).assign({name}).write()

  return findById(id)
}

const remove = (id) => {
  let removed = db.get('category').remove({ id }).write()

  return !!removed.length
}

const findById = (id) => {
  let category = db.get('category').find({id}).value()

  return category || null
}

module.exports = {
  save,
  findById,
  all,
  update,
  remove,
}