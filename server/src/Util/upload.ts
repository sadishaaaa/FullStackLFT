import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

interface MulterFile extends Express.Multer.File {}

let limit = {
  fileSize: 1024 * 1024 * 2, // 2Mb
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb) => {
    let staticFolder = "./public";
    cb(null, staticFolder);
  },

  filename: (req: Request, file: MulterFile, cb) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req: Request, file: MulterFile, cb: any) => {
  let validExtensions = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
    ".PNG",
  ];

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName);
  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limit,
});

export default upload;
