const index = (req, res) => {
  res.render('shop/index', { title: 'Express' });
}

const product = (req, res) => {
  res.render('shop/products', { title: 'Express' });
}

const promotion = (req, res) => {
  res.render('shop/promotion', { title: 'Express' });
}

const contact = (req, res) => {
  res.render('shop/contact', { title: 'Express' });
}


module.exports = {
  index,
  product,
  promotion,
  contact
}