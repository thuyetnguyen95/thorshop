var multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)

    req.body.fileUploadName = fileName

    cb(null, fileName)
  }
})

module.exports = multer({ storage: storage })