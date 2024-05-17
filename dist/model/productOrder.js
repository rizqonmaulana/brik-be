"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const category_1 = __importDefault(require("./category")); // Import the Category model
const product_1 = __importDefault(require("./product"));
class ProductOrder extends sequelize_1.Model {
}
ProductOrder.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_1.default,
            key: 'id',
        },
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: category_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'ProductOrder',
    tableName: 'productOrders',
    timestamps: true,
    paranoid: true,
});
// Define the association between Product and Category
// ProductOrder.belongsTo(Product, { foreignKey: 'productId' });
// ProductOrder.belongsTo(Category, { foreignKey: 'categoryId' });
exports.default = ProductOrder;
