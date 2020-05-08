var express = require('express');
var router = express.Router();

const ThorMiddleWare = require('../middlewares/thor')
const ThorController = require('../controllers/thor')

router.get('/login', ThorMiddleWare.isLoggedIn, ThorController.showLogin)
router.post('/login', ThorController.login)
router.get('/', ThorMiddleWare.auth, ThorController.index)
router.get('/category', ThorMiddleWare.auth, ThorController.indexCategory)
router.get('/product', ThorMiddleWare.auth, ThorController.product)

module.exports = router;