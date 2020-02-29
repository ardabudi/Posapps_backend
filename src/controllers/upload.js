const multer = require('multer')
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, './uploads')
  },
  filename: (request, file, cb) => {
    cb(null, file.fieldname + '-' + file.originalname)
  }

})
const fileFilter = (request, file, cb, error) => {
  const imageFilter = file.mimetype.toLowerCase()
  if (imageFilter === 'image/jpeg' || imageFilter === 'image/jpeg' || imageFilter === 'image/png') {
    cb(null, true)
  } else {
    cb('extension image only jpeg jpg and png', false)
  }
}
const upload = multer({
  storage,
fileFilter,
  limits: {
    fileSize: 2024 * 2024
  }
})
const uploads = upload.single('image')

module.exports = { productUpload: uploads }
