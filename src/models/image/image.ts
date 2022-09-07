import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config';
import Product from '../product/product';

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
  declare id: CreationOptional<number>;
  declare imageUrl: string;
  declare productId: ForeignKey<Product['id']>;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'images',
    paranoid: true,
  },
);

Product.hasMany(Image, {
  foreignKey: {
    name: 'productId',
    allowNull: false,
  },
  as: 'otherImages',
});
Image.belongsTo(Product, {
  foreignKey: 'productId',
});

export default Image;
