"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.get('/', productController_1.default.getAllProduct);
router.get('/:id', productController_1.default.getProductById);
router.post('/', authentication_1.isLogin, authentication_1.isAdmin, productController_1.default.createProduct);
router.patch('/:id', authentication_1.isLogin, authentication_1.isAdmin, productController_1.default.updateProduct);
router.delete('/:id', authentication_1.isLogin, authentication_1.isAdmin, productController_1.default.deleteProduct);
exports.default = router;
