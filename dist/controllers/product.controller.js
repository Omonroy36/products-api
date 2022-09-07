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
exports.createProduct = void 0;
const errors_1 = require("../utils/errors");
const product_1 = __importDefault(require("../models/product"));
const schemas_1 = require("../utils/schemas");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield schemas_1.productSchema.validateAsync(req.body);
            console.log(product);
            //Check for existing product by sku
            const foundProduct = yield product_1.default.findOne({
                where: {
                    sku: product.sku,
                },
            });
            if (foundProduct)
                res.status(400).json({
                    msg: 'product with this sku already exists',
                });
            //Create product
            const newProduct = yield product_1.default.create(product);
            if (newProduct)
                res.status(200).json({
                    msg: 'product created successfully',
                });
            else {
                res.status(400).json({
                    msg: 'a problem occurred while creating product',
                });
            }
        }
        catch (error) {
            res.status(500).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.createProduct = createProduct;
