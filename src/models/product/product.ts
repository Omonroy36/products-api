import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelizeConnection from '../config';
import { isValidSku } from '../../utils/utils';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare sku: string;
  declare name: string;
  declare brand: string;
  declare size: string | null;
  declare price: number;
  declare imageUrl: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    sku: {
      type: new DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      validate: {
        isValid(value: string) {
          if (!isValidSku(value)) {
            throw new Error('sku is not valid');
          }
        },
      },
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    brand: {
      type: new DataTypes.STRING(100),
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
      type: new DataTypes.STRING(20),
      allowNull: true,
    },
    price: {
      type: new DataTypes.FLOAT(),
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
    imageUrl: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'products',
    paranoid: true,
  },
);

export default Product;
