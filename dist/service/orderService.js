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
const order_1 = __importDefault(require("../model/order"));
const orderItem_1 = __importDefault(require("../model/orderItem"));
const user_1 = __importDefault(require("../model/user"));
const productOrder_1 = __importDefault(require("../model/productOrder"));
const OrderService = {
    getAllOrders(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.findAll(Object.assign({ include: [
                    {
                        model: user_1.default,
                        attributes: ['id', 'name']
                    },
                    {
                        model: orderItem_1.default,
                        attributes: ['id', 'quantity'],
                        include: [
                            {
                                model: productOrder_1.default,
                                attributes: ['id', 'name', 'price', 'imageUrl'],
                            }
                        ]
                    }
                ] }, option));
        });
    },
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.findOne({
                include: [
                    {
                        model: user_1.default,
                        attributes: ['id', 'name']
                    },
                    {
                        model: orderItem_1.default,
                        attributes: ['id', 'quantity'],
                        include: [
                            {
                                model: productOrder_1.default,
                                attributes: ['id', 'name', 'price', 'imageUrl'],
                            }
                        ]
                    }
                ],
                where: {
                    id: id
                }
            });
        });
    },
    createOrder(newOrder, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_1.default.create(newOrder, option);
        });
    },
    createOrderItem(_a, option_1) {
        return __awaiter(this, arguments, void 0, function* ({ orderId, productOrderIds }, option) {
            const newOrderItem = productOrderIds.map((item) => {
                return {
                    orderId: orderId,
                    productOrderId: item === null || item === void 0 ? void 0 : item.id,
                    quantity: item === null || item === void 0 ? void 0 : item.quantity
                };
            });
            return yield orderItem_1.default.bulkCreate(newOrderItem, option);
        });
    },
    updateOrder(_a, option_1) {
        return __awaiter(this, arguments, void 0, function* ({ orderId, totalPrice }, option) {
            return yield order_1.default.update({ totalPrice }, Object.assign({ where: { id: orderId } }, option));
        });
    },
};
exports.default = OrderService;
