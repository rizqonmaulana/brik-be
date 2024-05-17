"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadFileController_1 = __importDefault(require("../controller/uploadFileController"));
const uploadFile_1 = __importDefault(require("../middleware/uploadFile"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.post('/', authentication_1.isLogin, authentication_1.isAdmin, uploadFile_1.default, uploadFileController_1.default.uploadFile);
exports.default = router;
