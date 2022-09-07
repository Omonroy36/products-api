"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const product_1 = __importDefault(require("../product/product"));
class Image extends sequelize_1.Model {
}
Image.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    imageUrl: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    tableName: 'images',
    paranoid: true,
});
product_1.default.hasMany(Image, {
    foreignKey: {
        name: 'productId',
        allowNull: false,
    },
    as: 'otherImages',
});
Image.belongsTo(product_1.default, {
    foreignKey: 'productId',
});
exports.default = Image;
