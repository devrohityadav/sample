import * as multer from "multer";

import { config } from "../config";

const getStorage = (destination: string) =>
  multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, destination);
    },
    filename: function (_req, file, cb) {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const fileName = `${Date.now().toString()}-${name}`;
      cb(null, fileName);
    },
  });

const upload = (path: string) =>
  multer({
    storage: getStorage(path),
    limits: { fileSize: config.MAX_UPLOAD_SIZE },
  });

export { upload };
