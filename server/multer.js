const multer = require('multer'),
      fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    checkDirectorySync('uploads');
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
  return
}
 
const upload = multer({ storage: storage });

module.exports = upload;