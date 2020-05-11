var express = require('express');
var router = express.Router();

const ThorMiddleWare = require('../middlewares/thor')
const ThorController = require('../controllers/thor')

const uploadModule = require('../utils/upload')

router.get('/login', ThorMiddleWare.isLoggedIn, ThorController.showLogin)
router.post('/login', ThorController.login)
router.get('/', ThorMiddleWare.auth, ThorController.index)

router.get('/category', ThorMiddleWare.auth, ThorController.indexCategory)
router.get('/category/create', ThorMiddleWare.auth, ThorController.createCategory)
router.post('/category/store', ThorMiddleWare.auth, ThorController.storeCategory)
router.get('/category/edit/:id', ThorMiddleWare.auth, ThorController.editCategory)
router.post('/category/update/:id', ThorMiddleWare.auth, ThorController.updateCategory)
router.get('/category/delete/:id', ThorMiddleWare.auth, ThorController.deleteCategory)

router.get('/product', ThorMiddleWare.auth, ThorController.indexProduct)
router.get('/product/create', ThorMiddleWare.auth, ThorController.createProduct)
router.post('/product/store', ThorMiddleWare.auth, uploadModule.single('image'), ThorController.storeProduct)
router.get('/product/edit/:id', ThorMiddleWare.auth, ThorController.editProduct)
router.post('/product/update/:id', ThorMiddleWare.auth, ThorController.updateProduct)
router.get('/product/delete/:id', ThorMiddleWare.auth, ThorController.deleteProduct)

module.exports = router;