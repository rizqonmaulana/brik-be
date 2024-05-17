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
const cart_1 = __importDefault(require("../model/cart"));
const product_1 = __importDefault(require("../model/product"));
const CartService = {
    getCart(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_1.default.findAll(Object.assign({ include: {
                    model: product_1.default,
                    attributes: ['name', 'imageUrl', 'price']
                } }, option));
        });
    },
    createOrUpdateCart(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, productId }) {
            const getSameCart = yield cart_1.default.findOne({ where: { userId, productId } });
            if (getSameCart && (getSameCart === null || getSameCart === void 0 ? void 0 : getSameCart.quantity)) {
                const updatedQuantity = getSameCart.quantity + 1;
                yield cart_1.default.update({ quantity: updatedQuantity }, { where: { id: getSameCart.id } });
                return yield cart_1.default.findOne({ where: { userId, productId } });
            }
            return yield cart_1.default.create({ userId, productId, quantity: 1 });
        });
    },
    deleteCartByUserId(userId, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_1.default.destroy(Object.assign({ where: { userId } }, option));
        });
    },
    deleteCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_1.default.destroy({ where: { id: cartId } });
        });
    }
};
exports.default = CartService;
