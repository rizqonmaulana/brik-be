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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const associations_1 = __importDefault(require("./model/associations"));
//routes
const userRouter_1 = __importDefault(require("./router/userRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const uploadFileRouter_1 = __importDefault(require("./router/uploadFileRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const port = process.env.PORT || 3000;
app.use('/users', userRouter_1.default);
app.use('/products', productRouter_1.default);
app.use('/categories', categoryRouter_1.default);
app.use('/orders', orderRouter_1.default);
app.use('/upload-file', uploadFileRouter_1.default);
app.use('/carts', cartRouter_1.default);
// Sequelize initialization and server start
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define associations
        (0, associations_1.default)();
        yield database_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield database_1.default.sync({ force: false, alter: false });
        console.log('All models were synchronized successfully.');
        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
startServer();
