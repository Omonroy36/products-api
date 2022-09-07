"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const utils_1 = require("../utils/utils");
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    sku: {
        type: new sequelize_1.DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
            isValid(value) {
                if (!(0, utils_1.isValidSku)(value)) {
                    throw new Error('sku is not valid');
                }
            },
        },
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            min: {
                args: [3],
                msg: 'name field should be at least 3 characters long',
            },
            max: {
                args: [50],
                msg: 'name field maximun characters exceded',
            },
        },
    },
    brand: {
        type: new sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            min: {
                args: [3],
                msg: 'brand field should be at least 3 characters long',
            },
            max: {
                args: [50],
                msg: 'brand field maximun characters exceded',
            },
        },
    },
    size: {
        type: new sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    price: {
        type: new sequelize_1.DataTypes.FLOAT(),
        allowNull: false,
        validate: {
            isFloat: { msg: 'price field must be numeric.' },
            min: {
                args: [1],
                msg: 'price field should not be less than 1',
            },
            max: {
                args: [99999999],
                msg: 'price field exceded maximun amount (99.999.999)',
            },
        },
    },
    image: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
}, {
    sequelize: config_1.default,
    tableName: 'products',
    paranoid: true,
});
exports.default = Product;
