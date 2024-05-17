"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controller/orderController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.get('/', authentication_1.isLogin, authentication_1.isAdmin, orderController_1.default.getAllOrders);
router.get('/user', authentication_1.isLogin, orderController_1.default.getOrderByUserid);
router.get('/:id', authentication_1.isLogin, orderController_1.default.getOrderByid);
router.post('/', authentication_1.isLogin, orderController_1.default.createOrder);
exports.default = router;
