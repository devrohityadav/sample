import * as multer from "multer";

const config = {
  destination: "uploads/",
  // maxUploadSize in bytes 200 * 1024 = 200kb (approx)
  maxUploadSize: 200 * 1024,
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, config.destination);
  },
  filename: function (_req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const fileName = `${Date.now().toString()}-${name}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: config.maxUploadSize },
});

export { upload };
