"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.get('/', categoryController_1.default.getAllCategories);
router.post('/', authentication_1.isLogin, authentication_1.isAdmin, categoryController_1.default.createCategory);
router.patch('/:id', authentication_1.isLogin, authentication_1.isAdmin, categoryController_1.default.updateCategory);
router.delete('/:id', authentication_1.isLogin, authentication_1.isAdmin, categoryController_1.default.deleteCategory);
exports.default = router;
