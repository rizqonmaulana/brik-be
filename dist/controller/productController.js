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
const productService_1 = __importDefault(require("../service/productService"));
const response_1 = require("../helper/response");
const ProductController = {
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page ? parseInt(req.query.page) : null;
                const limit = req.query.limit ? parseInt(req.query.limit) : null;
                const pagination = {
                    page: page,
                    limit: limit
                };
                const products = yield productService_1.default.getAllProducts(req.query, { attributes: ['id', 'name', 'price', 'stock', 'imageUrl', 'categoryId'] });
                const getCounts = yield productService_1.default.getAndCountAllProducts(req.query, {});
                const result = {
                    data: products,
                    pagination: Object.assign(Object.assign({}, pagination), { totalData: getCounts.count, totalPage: Math.ceil(getCounts.count / (limit ? limit : getCounts.count)) })
                };
                res.json((0, response_1.successResponse)('Products retrieved successfully', result));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving products', error.message));
            }
        });
    },
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const product = yield productService_1.default.getProduct({ where: { id: productId } });
                if (!product)
                    return res.status(404).json((0, response_1.errorResponse)('Product not found'));
                res.json((0, response_1.successResponse)('Product retrieved successfully', product));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving the product', error.message));
            }
        });
    },
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield productService_1.default.createProduct(req.body);
                res.json((0, response_1.successResponse)('Product created successfully', newProduct));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while creating the product', error.message));
            }
        });
    },
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const product = yield productService_1.default.getProduct({ where: { id: productId } });
                if (!product)
                    return res.status(404).json((0, response_1.errorResponse)('Product not found'));
                const updatedProduct = yield productService_1.default.updateProduct(productId, req.body);
                // If no rows were updated, return failed message. 0=failed, 1=success
                if (updatedProduct[0] === 0)
                    throw Error();
                const newProduct = yield productService_1.default.getProduct({ where: { id: productId } });
                res.json((0, response_1.successResponse)('Product updated successfully', newProduct));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while updating the product', error.message));
            }
        });
    },
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id);
                const deletedProduct = yield productService_1.default.deleteProduct(productId);
                if (!deletedProduct)
                    return res.status(404).json((0, response_1.errorResponse)('Product not found'));
                res.json((0, response_1.successResponse)('Product deleted successfully'));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while deleting the product', error.message));
            }
        });
    }
};
exports.default = ProductController;
