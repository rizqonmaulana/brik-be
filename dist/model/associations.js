"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const order_1 = __importDefault(require("./order"));
const category_1 = __importDefault(require("./category"));
const orderItem_1 = __importDefault(require("./orderItem"));
const product_1 = __importDefault(require("./product"));
const productOrder_1 = __importDefault(require("./productOrder"));
const cart_1 = __importDefault(require("./cart"));
// Define associations
const defineAssociations = () => {
    user_1.default.hasMany(order_1.default, { foreignKey: 'userId' });
    order_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    user_1.default.hasMany(cart_1.default, { foreignKey: 'userId' });
    cart_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    order_1.default.hasMany(orderItem_1.default, { foreignKey: 'orderId' });
    orderItem_1.default.belongsTo(order_1.default, { foreignKey: 'orderId' });
    productOrder_1.default.hasOne(orderItem_1.default, { foreignKey: 'productOrderId' });
    orderItem_1.default.belongsTo(productOrder_1.default, { foreignKey: 'productOrderId' });
    product_1.default.hasMany(productOrder_1.default, { foreignKey: 'productId' });
    productOrder_1.default.belongsTo(product_1.default, { foreignKey: 'productId' });
    product_1.default.hasMany(cart_1.default, { foreignKey: 'productId' });
    cart_1.default.belongsTo(product_1.default, { foreignKey: 'productId' });
    category_1.default.hasMany(product_1.default, { foreignKey: 'categoryId' });
    category_1.default.hasMany(productOrder_1.default, { foreignKey: 'categoryId' });
    product_1.default.belongsTo(category_1.default, { foreignKey: 'categoryId' });
    productOrder_1.default.belongsTo(category_1.default, { foreignKey: 'categoryId' });
};
exports.default = defineAssociations;
