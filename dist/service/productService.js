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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const product_1 = __importDefault(require("../model/product"));
const productOrder_1 = __importDefault(require("../model/productOrder"));
const ProductService = {
    getAllProducts(where, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = where || {}, { page, limit, sort } = _a, whereConditions = __rest(_a, ["page", "limit", "sort"]);
            if (whereConditions.name === '')
                delete whereConditions.name;
            if (whereConditions.sort === '')
                delete whereConditions.sort;
            if (whereConditions.categoryId == 0)
                delete whereConditions.categoryId;
            if (whereConditions.name) {
                whereConditions.name = { [sequelize_1.default.Op.iLike]: `%${whereConditions.name}%` };
            }
            const offset = page ? (page - 1) * limit : 0;
            let order = [['id', 'ASC']]; // Default sorting by id in ascending order
            if (sort) {
                const [sortColumn, sortDirection] = sort.split(',');
                if (sortColumn === 'price') {
                    order = [[sortColumn, sortDirection]]; // Don't use `lower` for 'price'
                }
                else {
                    order = [[sequelize_1.default.fn('lower', sequelize_1.default.col(sortColumn)), sortDirection]];
                }
            }
            return yield product_1.default.findAll(Object.assign({ where: whereConditions, offset,
                limit,
                order }, option));
        });
    },
    getAndCountAllProducts(where, option) {
        return __awaiter(this, void 0, void 0, function* () {
            if (where.name === '')
                delete where.name;
            if (where.sort === '')
                delete where.sort;
            if (where.categoryId == 0)
                delete where.categoryId;
            if (where && where.name)
                where.name = { [sequelize_1.default.Op.iLike]: `%${where.name}%` };
            if (where && where.page)
                delete where.page;
            if (where && where.limit)
                delete where.limit;
            if (where && where.sort)
                delete where.sort;
            return yield product_1.default.findAndCountAll(Object.assign({ where: where }, option));
        });
    },
    checkProductStock(products, getProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                isSufficient: true,
                errors: []
            };
            for (const product of products) {
                const stockItem = getProducts.find(item => item.id === product.productId);
                if (!stockItem) {
                    response.isSufficient = false;
                    response.errors.push(`Product with ID ${product.productId} is not available.`);
                }
                else if (stockItem.stock < product.quantity) {
                    response.isSufficient = false;
                    response.errors.push(`Product with ID ${product.productId} does not have enough stock. Requested: ${product.quantity}, Available: ${stockItem.stock}.`);
                }
            }
            return response;
        });
    },
    createProductOrder(products, getProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            const productOrders = getProducts.map(item => {
                var _a;
                const quantity = products.find(product => product.productId === item.id);
                const { id, name, price, description, categoryId, imageUrl } = item;
                return {
                    name,
                    price,
                    description,
                    categoryId,
                    imageUrl,
                    quantity: (_a = quantity === null || quantity === void 0 ? void 0 : quantity.quantity) !== null && _a !== void 0 ? _a : 0,
                    productId: id !== null && id !== void 0 ? id : 0
                };
            });
            return yield productOrder_1.default.bulkCreate(productOrders);
        });
    },
    updateStock(products, getProducts, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedStocks = getProducts.map(product => {
                const orderItem = products.find(item => item.productId === product.id);
                const newStock = orderItem ? product.stock - orderItem.quantity : product.stock;
                return {
                    id: product.id,
                    stock: newStock
                };
            });
            for (const order of updatedStocks) {
                yield product_1.default.update({ stock: order.stock }, Object.assign({ where: { id: order.id } }, option));
            }
        });
    },
    countTotalPrice(products, getProducts) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            getProducts.map(product => {
                const orderedItem = products.find(item => item.productId === product.id);
                if (orderedItem)
                    total += (orderedItem === null || orderedItem === void 0 ? void 0 : orderedItem.quantity) * product.price;
            });
            return total;
        });
    },
    getProduct(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.findOne(Object.assign({}, option));
        });
    },
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.create(newProduct);
        });
    },
    updateProduct(productId, updateProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.update(updateProduct, { where: { id: productId } });
        });
    },
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_1.default.destroy({ where: { id: productId } });
        });
    }
    // async checkUsername(username:string){
    //     return await User.findOne({where: {username}})
    // },
    // async getUserById(userId: number, option?: any){
    //     return await User.findOne({
    //         where: { id: userId },
    //         ...option
    //     })
    // },
    // async updateUser(id: number, updatedUser: Partial<User>): Promise<User | undefined> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index === -1) return undefined;
    //   users[index] = { ...users[index], ...updatedUser };
    //   return users[index];
    // },
    // async deleteUser(id: number): Promise<void> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index !== -1) users.splice(index, 1);
    // },
};
exports.default = ProductService;
