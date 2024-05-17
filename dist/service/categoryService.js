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
const category_1 = __importDefault(require("../model/category"));
const CategoryService = {
    getAllCategories(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.findAll(Object.assign({}, option));
        });
    },
    getCategory(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.findOne(Object.assign({}, option));
        });
    },
    createCategory(newCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.create({ name: newCategory });
        });
    },
    updateCategory(categoryId, updateCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.update({ name: updateCategory }, { where: { id: categoryId } });
        });
    },
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_1.default.destroy({ where: { id: categoryId } });
        });
    }
};
exports.default = CategoryService;
