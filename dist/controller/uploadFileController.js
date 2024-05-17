"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebase_1 = __importDefault(require("../config/firebase"));
const currentDateTime_1 = require("../helper/currentDateTime");
const response_1 = require("../helper/response");
//Initialize a firebase application
(0, app_1.initializeApp)(firebase_1.default.firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = (0, storage_1.getStorage)();
const UploadFileController = {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                if (!req.file || !req.file.buffer) {
                    throw new Error('No file uploaded or buffer is missing.');
                }
                const dateTime = (0, currentDateTime_1.giveCurrentDateTime)();
                const storageRef = (0, storage_1.ref)(storage, `files/${((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname) + " " + dateTime}`);
                const metadata = {
                    contentType: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
                };
                // Upload the file in the bucket storage
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.buffer, metadata);
                //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
                // Grab the public url
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                const file = {
                    name: (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.originalname,
                    type: (_e = req === null || req === void 0 ? void 0 : req.file) === null || _e === void 0 ? void 0 : _e.mimetype,
                    downloadURL: downloadURL
                };
                res.json((0, response_1.successResponse)('File uploaded successfully', file));
            }
            catch (error) {
                console.log('error => ', error);
                res.status(500).json((0, response_1.errorResponse)('An error occurred while uploading file', error.message));
            }
        });
    }
};
exports.default = UploadFileController;
