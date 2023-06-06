const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    // Validasi format file
    const allowedFormats = ['.jpg', '.jpeg', '.png'];
    const fileExt = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'));
    if (!allowedFormats.includes(fileExt)) {
      return cb(new Error('Invalid file format'));
    }

    // Validasi ukuran file
    if (file.size > 2 * 1024 * 1024) {
      return cb(new Error('File size exceeds the limit'));
    }

    cb(null, true);
  },
}).single('poster');

module.exports = upload;
