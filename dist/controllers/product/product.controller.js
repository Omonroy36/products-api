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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductBySku = exports.updateProductBySku = exports.getAllProducts = exports.getProductBySku = exports.createProduct = void 0;
const errors_1 = require("../../utils/errors");
const dataAccess_1 = require("./dataAccess");
const schema_1 = require("../../models/product/schema");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield schema_1.productSchema.validateAsync(req.body);
            const newProduct = yield (0, dataAccess_1.create)(product);
            if (newProduct) {
                res.status(200).json({
                    msg: 'product created successfully',
                });
            }
            else {
                res.status(400).json({
                    msg: 'a problem occurred while creating product',
                });
            }
        }
        catch (error) {
            res.status(400).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.createProduct = createProduct;
function getProductBySku(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sku = req.params.sku;
            const foundProduct = yield (0, dataAccess_1.findBySku)(sku);
            if (foundProduct)
                res.status(200).json(foundProduct);
            else
                res.status(404).json({
                    msg: 'product not found',
                });
        }
        catch (error) {
            res.status(400).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.getProductBySku = getProductBySku;
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, dataAccess_1.getAll)();
            if (products) {
                res.status(200).json(products);
            }
            else {
                res.status(404).json({
                    msg: 'products not found',
                });
            }
        }
        catch (error) {
            res.status(400).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.getAllProducts = getAllProducts;
function updateProductBySku(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sku = req.params.sku;
            const _a = yield schema_1.productSchema.validateAsync(req.body), { otherImages } = _a, product = __rest(_a, ["otherImages"]);
            const foundProduct = yield (0, dataAccess_1.findBySku)(sku);
            if (foundProduct) {
                if (otherImages) {
                    yield (0, dataAccess_1.createProductImages)(otherImages, foundProduct.id);
                }
                yield foundProduct.update(Object.assign({ id: foundProduct.id }, product));
                res.status(200).json(foundProduct);
            }
            else {
                res.status(404).json({
                    msg: 'product not found',
                });
            }
        }
        catch (error) {
            res.status(400).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.updateProductBySku = updateProductBySku;
function deleteProductBySku(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sku = req.params.sku;
            const foundProduct = yield (0, dataAccess_1.findBySku)(sku);
            if (foundProduct) {
                foundProduct.destroy();
                res.status(204).end();
            }
            else {
                res.status(404).json({
                    msg: 'product not found',
                });
            }
        }
        catch (error) {
            res.status(400).json({
                error: (0, errors_1.getErrorMessage)(error),
            });
        }
    });
}
exports.deleteProductBySku = deleteProductBySku;
