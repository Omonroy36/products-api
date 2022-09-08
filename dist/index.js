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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./routes/product"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT;
const isDev = process.env.NODE_ENV === 'development';
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use('/api/store', product_1.default);
exports.app.get('/', (req, res) => {
    res.send('Express and TypescriptServer');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.default
        .sync({ alter: isDev })
        .then(() => console.log('Connected to database...'))
        .catch((error) => console.log(error));
    exports.app.listen(port, () => {
        console.log(`[server]: Server is running at https://localhost:${port}`);
    });
}))();
