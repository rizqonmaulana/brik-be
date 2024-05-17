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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const userService_1 = __importDefault(require("../service/userService"));
const response_1 = require("../helper/response");
const UserController = {
    // async getAllUsers(req: Request, res: Response) {
    //   try {
    //     const users = await UserService.getAllUsers();
    //     res.json(users);
    //   } catch (error: any) { // Explicitly specify the type of 'error'
    //     res.status(500).json({ message: error.message });
    //   }
    // },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const checkDuplicateUsername = yield userService_1.default.checkUsername(username);
                if (checkDuplicateUsername)
                    return res.status(409).json((0, response_1.errorResponse)('Username already exists, please try another username'));
                const newUser = yield userService_1.default.createUser(req.body);
                const userObject = newUser.toJSON();
                // Check if the password property exists before deleting it
                if (userObject.password) {
                    delete userObject.password;
                }
                res.json((0, response_1.successResponse)('User created successfully', userObject));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while creating the user', error.message));
            }
        });
    },
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield userService_1.default.checkUsername(username);
                if (!user)
                    return res.status(401).json((0, response_1.errorResponse)('Invalid username or password'));
                const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
                if (!passwordMatch)
                    return res.status(401).json((0, response_1.errorResponse)('Invalid username or password'));
                const token = (0, jsonwebtoken_1.sign)({ userId: user.id, role: user.role }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: `${process.env.JWT_EXPIRES_IN}` });
                const userObject = user.toJSON();
                if (userObject.password) {
                    delete userObject.password;
                }
                res.json((0, response_1.successResponse)('Login successful', Object.assign(Object.assign({}, userObject), { token })));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while logging in', error.message));
            }
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const user = yield userService_1.default.getUserById(userId, { attributes: { exclude: ['password'] } });
                if (!user)
                    return res.status(404).json((0, response_1.errorResponse)('User not found'));
                res.json((0, response_1.successResponse)('User retrieved successfully', user));
            }
            catch (error) {
                res.status(500).json((0, response_1.errorResponse)('An error occurred while retrieving the user', error.message));
            }
        });
    },
    // async updateUser(req: Request, res: Response) {
    //   try {
    //     const userId = parseInt(req.params.id, 10);
    //     const updatedUser = await UserService.updateUser(userId, req.body);
    //     res.json(updatedUser);
    //   } catch (error: any) { // Explicitly specify the type of 'error'
    //     res.status(500).json({ message: error.message });
    //   }
    // },
    // async deleteUser(req: Request, res: Response) {
    //   try {
    //     const userId = parseInt(req.params.id, 10);
    //     await UserService.deleteUser(userId);
    //     res.sendStatus(204);
    //   } catch (error: any) { // Explicitly specify the type of 'error'
    //     res.status(500).json({ message: error.message });
    //   }
    // },
};
exports.default = UserController;
