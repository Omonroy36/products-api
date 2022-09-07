"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const route = (0, express_1.Router)();
route.post('/products', product_controller_1.createProduct);
exports.default = route;
