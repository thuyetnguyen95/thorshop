const index = (req, res) => {
  res.render('shop/index');
}

const product = (req, res) => {
  res.render('shop/products');
}

const promotion = (req, res) => {
  res.render('shop/promotion');
}

const contact = (req, res) => {
  res.render('shop/contact');
}


module.exports = {
  index,
  product,
  promotion,
  contact
}