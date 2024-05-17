"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const order_1 = __importDefault(require("./order")); // Import the Order model
const productOrder_1 = __importDefault(require("./productOrder")); // Import the Product model
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: order_1.default,
            key: 'id',
        },
    },
    productOrderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: productOrder_1.default,
            key: 'id',
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize: database_1.default,
    modelName: 'OrderItem',
    tableName: 'orderItems',
    timestamps: true,
    paranoid: true,
});
exports.default = OrderItem;
