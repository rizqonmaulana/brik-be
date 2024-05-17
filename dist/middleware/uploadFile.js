"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const response_1 = require("../helper/response");
// Custom error class for file type errors
class FileTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileTypeError';
    }
}
// Define a file filter to allow only image files
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        // Use the custom FileTypeError for non-image files
        const error = new FileTypeError('Only image files are allowed!');
        cb(error);
    }
};
const limit2Mb = 5 * 1024 * 1024;
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: limit2Mb }, // Limit file size to 2MB
    fileFilter: imageFileFilter, // Use the image file filter
}).single('image');
const uploadFile = (req, res, next) => {
    upload(req, res, function (error) {
        if (error instanceof multer_1.default.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json((0, response_1.errorResponse)('An error occurred while uploading file', error.message));
        }
        else if (error instanceof FileTypeError) {
            // A custom file type error occurred when uploading.
            return res.status(400).json((0, response_1.errorResponse)('An error occurred while uploading file', error.message));
        }
        else if (error) {
            // An unknown error occurred when uploading.
            return res.status(400).json((0, response_1.errorResponse)('An error occurred while uploading file', error.message));
        }
        // Everything went fine.
        next();
    });
};
exports.default = uploadFile;
