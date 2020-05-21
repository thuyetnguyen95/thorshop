var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/index');

/* GET home page. */
router.get('/', HomeController.index);
router.get('/products', HomeController.product);
router.get('/promotion', HomeController.promotion);
router.get('/contact', HomeController.contact);

module.exports = router;
