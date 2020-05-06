var express = require('express');
var router = express.Router();

const thorController = require('../controllers/thor')

router.get('/login', thorController.showLogin)
router.post('/login', thorController.login)
router.get('/', thorController.index)



module.exports = router;