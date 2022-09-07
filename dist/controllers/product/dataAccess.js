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
exports.createProductImages = exports.getAll = exports.create = exports.findBySku = void 0;
const product_1 = __importDefault(require("../../models/product/product"));
const image_1 = __importDefault(require("../../models/image/image"));
function findBySku(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        return product_1.default.findOne({
            where: {
                sku,
            },
            include: {
                model: image_1.default,
                as: 'otherImages',
                attributes: ['imageUrl'],
            },
            attributes: ['sku', 'name', 'brand', 'size', 'price', 'imageUrl', 'id'],
        }).then((product) => product);
    });
}
exports.findBySku = findBySku;
function create(product) {
    return __awaiter(this, void 0, void 0, function* () {
        return product_1.default.create(product).then((newProduct) => {
            if (product.otherImages && product.otherImages.length > 0) {
                for (const image of product.otherImages) {
                    image_1.default.create({ imageUrl: image, productId: newProduct.id });
                }
            }
            return newProduct;
        });
    });
}
exports.create = create;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return product_1.default.findAll({
            include: {
                model: image_1.default,
                as: 'otherImages',
                attributes: ['imageUrl'],
            },
            attributes: ['sku', 'name', 'brand', 'size', 'price', 'imageUrl'],
        }).then((products) => products);
    });
}
exports.getAll = getAll;
function createProductImages(images, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const image of images) {
            yield image_1.default.create({ imageUrl: image, productId: productId });
        }
    });
}
exports.createProductImages = createProductImages;
