import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { errorResponse } from '../helper/response';

// Custom error class for file type errors
class FileTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileTypeError';
  }
}

// Define a file filter to allow only image files
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // Use the custom FileTypeError for non-image files
    const error = new FileTypeError('Only image files are allowed!');
    cb(error);
  }
};

const limit2Mb = 5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: limit2Mb }, // Limit file size to 2MB
  fileFilter: imageFileFilter,  // Use the image file filter
}).single('image');

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json(errorResponse('An error occurred while uploading file', error.message));
    } else if (error instanceof FileTypeError) {
      // A custom file type error occurred when uploading.
      return res.status(400).json(errorResponse('An error occurred while uploading file', error.message));
    } else if (error) {
      // An unknown error occurred when uploading.
      return res.status(400).json(errorResponse('An error occurred while uploading file', error.message));
    }
    // Everything went fine.
    next();
  });
};

export default uploadFile;
