"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../controller/cartController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.get('/', authentication_1.isLogin, cartController_1.default.getCartByUserId);
router.post('/', authentication_1.isLogin, cartController_1.default.createOrUpdateCart);
router.delete('/:id', authentication_1.isLogin, cartController_1.default.deleteCart);
exports.default = router;
