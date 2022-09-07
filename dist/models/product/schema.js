"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    sku: joi_1.default.string()
        .pattern(/^FAL-([0-9]{7,8})$/)
        .required(),
    name: joi_1.default.string().min(3).max(50).required(),
    brand: joi_1.default.string().min(3).max(50).required(),
    size: joi_1.default.string().min(1).max(20).allow(''),
    price: joi_1.default.number().min(1).max(99999999).required(),
    imageUrl: joi_1.default.string().uri(),
    otherImages: joi_1.default.array().items(joi_1.default.string().uri()),
});
