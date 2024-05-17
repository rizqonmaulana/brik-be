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
const cartService_1 = __importDefault(require("../service/cartService"));
const response_1 = require("../helper/response");
const CartController = {
    getCartByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.token.userId;
                const cart = yield cartService_1.default.getCart({ where: { userId: userId } });
                if (!cart)
                    return res.status(404).json((0, response_1.errorResponse)('Cart not found'));
                res.json((0, response_1.successResponse)('Cart retrieved successfully', cart));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving the cart', error.message));
            }
        });
    },
    createOrUpdateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                const userId = req.token.userId;
                const newCart = yield cartService_1.default.createOrUpdateCart({ userId, productId });
                res.json((0, response_1.successResponse)('Cart created successfully', newCart));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while creating the cart', error.message));
            }
        });
    },
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = parseInt(req.params.id);
                const deletedCart = yield cartService_1.default.deleteCart(cartId);
                if (!deletedCart)
                    return res.status(404).json((0, response_1.errorResponse)('Cart not found'));
                res.json((0, response_1.successResponse)('Cart deleted successfully'));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while deleting the cart', error.message));
            }
        });
    }
};
exports.default = CartController;
