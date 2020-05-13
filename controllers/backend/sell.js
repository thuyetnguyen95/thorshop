const Category = require('../../models/category')
const Product = require('../../models/product')

module.exports = {
  indexSell: (req, res) => {
    
    res.render('thor/sell/index')
  },
  
  // createCategory: (req, res) => {
  //   res.render('thor/sell/create')
  // },
  
  // storeCategory: (req, res) => {
    
  // },
  
  // editCategory: (req, res) => {
    
  // },
  
  // updateCategory: (req, res) => {
    
  // },
  // deleteCategory: (req, res) => {
    
  // }
}