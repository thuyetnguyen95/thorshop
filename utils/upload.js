var multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    if (!file) return cb(null)

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)

    req.body.fileUploadName = fileName

    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  if (!file) return cb(null)
  
  if (file.mimetype.toLowerCase() === 'image/png' || file.mimetype.toLowerCase() === 'image/jpg' || file.mimetype.toLowerCase() === 'image/jpeg') {
    cb(null, req)
  } else {
    cb('file type invalid')
  }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter })