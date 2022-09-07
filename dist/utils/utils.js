"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSku = void 0;
function isValidSku(string) {
    const regex = new RegExp(/^FAL-([0-9]{7,8})$/);
    if (!regex.test(string))
        return false;
    return true;
}
exports.isValidSku = isValidSku;
