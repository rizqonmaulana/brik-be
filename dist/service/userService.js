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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../model/user"));
const UserService = {
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(newUser.password, 10);
            return yield user_1.default.create(Object.assign(Object.assign({}, newUser), { password: hashPassword }));
        });
    },
    checkUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({ where: { username } });
        });
    },
    getUserById(userId, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne(Object.assign({ where: { id: userId } }, option));
        });
    },
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
exports.default = UserService;
