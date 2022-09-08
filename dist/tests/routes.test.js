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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('Product API', () => {
    it('should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            sku: 'FAL-1100000',
            name: 'Bicicleta Baltoro Aro 29',
            brand: 'Jeep',
            price: 45990.0,
            imageUrl: 'https://falabella.scene7.com/is/image/Falabella/881952249_1?wid=800&hei=800&qlt=70',
            size: '',
        };
        const res = yield (0, supertest_1.default)(index_1.app).post('/api/store/products').send(product);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg');
    }));
    it('should show all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/api/store/products');
        const isArray = Array.isArray(res.body);
        expect(res.statusCode).toEqual(200);
        expect(isArray).toBe(true);
    }));
    it('should show a product by its sku', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/api/store/products/' + 'FAL-1100000');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    }));
    it('should update a product by its sku', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            sku: 'FAL-1100000',
            name: 'Bicicleta Baltoro Aro 26',
            brand: 'Trek',
            price: 4115990.0,
            imageUrl: 'https://falabella.scene7.com/is/image/Falabella/881952249_1?wid=800&hei=800&qlt=70',
            size: '26',
        };
        const res = yield (0, supertest_1.default)(index_1.app)
            .put('/api/store/products/' + 'FAL-1100000')
            .send(product);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('sku');
    }));
    it('should delete a product by its sku', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).delete('/api/store/products/' + 'FAL-1100000');
        expect(res.statusCode).toEqual(204);
    }));
});
