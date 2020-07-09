import * as multer from "multer";

import { config } from "../config";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, config.DESTINATION);
  },
  filename: function (_req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const fileName = `${Date.now().toString()}-${name}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: config.MAX_UPLOAD_SIZE },
});

export { upload };
