const multer = require("multer");

const destination = "uploads/";
// maxUploadSize in bytes 1 * 1024 = 1kb
const maxUploadSize = 200 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const fileName = `${Date.now().toString()}-${name}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxUploadSize },
});

module.exports = { upload };
