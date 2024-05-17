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
const categoryService_1 = __importDefault(require("../service/categoryService"));
const response_1 = require("../helper/response");
const CategoryController = {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService_1.default.getAllCategories();
                res.json((0, response_1.successResponse)('Categories retrieved successfully', categories));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving categorys', error.message));
            }
        });
    },
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const newCategory = yield categoryService_1.default.createCategory(name);
                res.json((0, response_1.successResponse)('Category created successfully', newCategory));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while creating the category', error.message));
            }
        });
    },
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = parseInt(req.params.id);
                const { name } = req.body;
                const category = yield categoryService_1.default.getCategory({ where: { id: categoryId } });
                if (!category)
                    return res.status(404).json((0, response_1.errorResponse)('Category not found'));
                const updatedCategory = yield categoryService_1.default.updateCategory(categoryId, name);
                // If no rows were updated, return failed message. 0=failed, 1=success
                if (updatedCategory[0] === 0)
                    throw Error();
                const newCategory = yield categoryService_1.default.getCategory({ where: { id: categoryId } });
                res.json((0, response_1.successResponse)('Category updated successfully', newCategory));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while updating the category', error.message));
            }
        });
    },
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = parseInt(req.params.id);
                const deletedCategory = yield categoryService_1.default.deleteCategory(categoryId);
                if (!deletedCategory)
                    return res.status(404).json((0, response_1.errorResponse)('Category not found'));
                res.json((0, response_1.successResponse)('Category deleted successfully'));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while deleting the category', error.message));
            }
        });
    }
};
exports.default = CategoryController;
