"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../helper/response");
const user_1 = require("../model/user");
const isLogin = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(' ')[1];
        jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET_KEY}`, (error, result) => {
            if ((error && error.name === 'JsonWebTokenError') ||
                (error && error.name === 'TokenExpiredError')) {
                console.log(error);
                return res.status(403).json((0, response_1.errorResponse)('Invalid token', error.message));
            }
            else {
                req.token = result;
                next();
            }
        });
    }
    else {
        return res.status(400).json((0, response_1.errorResponse)('Please login first'));
    }
};
exports.isLogin = isLogin;
const isAdmin = (req, res, next) => {
    const userData = req.token;
    if (!userData || userData.role !== user_1.UserRole.ADMIN) {
        return res.status(401).json((0, response_1.errorResponse)('You are not allowed to access this page'));
    }
    else {
        next();
    }
};
exports.isAdmin = isAdmin;
