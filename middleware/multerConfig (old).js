const multer = require('multer');

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Tentukan direktori penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Batasan ukuran file dalam byte (contoh: 2MB)
  },
});

module.exports = upload;
