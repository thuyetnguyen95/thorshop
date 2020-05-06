var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop/index', { title: 'Express' });
});

router.get('/products', function(req, res, next) {
  res.render('shop/products', { title: 'Express' });
});

router.get('/promotion', function(req, res, next) {
  res.render('shop/promotion', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('shop/contact', { title: 'Express' });
});

module.exports = router;
