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
const sequelize_1 = require("sequelize");
const orderService_1 = __importDefault(require("../service/orderService"));
const productService_1 = __importDefault(require("../service/productService"));
const cartService_1 = __importDefault(require("../service/cartService"));
const response_1 = require("../helper/response");
const database_1 = __importDefault(require("../config/database"));
const OrderController = {
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderService_1.default.getAllOrders();
                res.json((0, response_1.successResponse)('Orders retrieved successfully', orders));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving orders', error.message));
            }
        });
    },
    getOrderByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.id);
                const order = yield orderService_1.default.getOrderById(orderId);
                res.json((0, response_1.successResponse)('Order retrieved successfully', order));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving the order', error.message));
            }
        });
    },
    getOrderByUserid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.token.userId;
                const order = yield orderService_1.default.getAllOrders({ where: { userId: parseInt(userId) } });
                res.json((0, response_1.successResponse)('Order retrieved successfully', order));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving the order', error.message));
            }
        });
    },
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield database_1.default.transaction();
            try {
                const { products } = req.body;
                const userId = parseInt(req.body.userId);
                const order = yield orderService_1.default.createOrder({ userId: userId }, { transaction });
                const productIds = products.map((product) => product.productId);
                const getProducts = yield productService_1.default.getAllProducts({
                    id: {
                        [sequelize_1.Op.in]: productIds
                    }
                }, { transaction });
                const isStockSufficient = yield productService_1.default.checkProductStock(products, getProducts);
                if (isStockSufficient.isSufficient === false) {
                    yield transaction.rollback();
                    return res.status(400).json((0, response_1.errorResponse)(isStockSufficient.errors.join(', ')));
                }
                const createProductOrder = yield productService_1.default.createProductOrder(products, getProducts);
                const productOrderIds = createProductOrder.map((product) => {
                    const quantity = products.find((item) => item.productId === product.productId);
                    return {
                        id: product.id,
                        quantity: quantity === null || quantity === void 0 ? void 0 : quantity.quantity
                    };
                });
                yield orderService_1.default.createOrderItem({ orderId: order === null || order === void 0 ? void 0 : order.id, productOrderIds }, { transaction });
                yield productService_1.default.updateStock(products, getProducts, { transaction });
                const countTotalPrice = yield productService_1.default.countTotalPrice(products, getProducts);
                yield orderService_1.default.updateOrder({ orderId: order === null || order === void 0 ? void 0 : order.id, totalPrice: countTotalPrice }, { transaction });
                yield cartService_1.default.deleteCartByUserId(userId, { transaction });
                yield transaction.commit();
                res.json((0, response_1.successResponse)('Order created successfully', order));
            }
            catch (error) {
                yield transaction.rollback();
                res.status(500).json((0, response_1.errorResponse)('An error occurred while creating the order', error.message));
            }
        });
    },
};
exports.default = OrderController;
