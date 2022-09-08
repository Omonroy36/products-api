"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
describe('Valid SKU Test', () => {
    it('should test that FAL-1000000 is valid', () => {
        const isValid = (0, utils_1.isValidSku)('FAL-1000000');
        expect(isValid).toBe(true);
    });
    it('should test that abc_9999 is invalid', () => {
        const isValid = (0, utils_1.isValidSku)('abc_9999');
        expect(isValid).toBe(false);
    });
});
