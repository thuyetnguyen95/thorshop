const shortid  = require('shortid')
const db = require('../database/db')

const save = (name, email) => {
  const id = shortid.generate()
  db.get('users').push({id, name, email}).write()

  return findById(id)
}

const all = () => {
  let users = db.get('users').value()

  return users.length ? users : []
}

const findById = (id) => {
  let users = db.get('users').find({id}).value()

  return users || null
}

const findByEmail = (email) => {
  let users = db.get('users').find({email}).value()

  return users || null
}

module.exports = {
  save,
  findById,
  all,
  findByEmail,
}