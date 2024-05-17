import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Category from './category'; // Import the Category model

interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id?: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public description!: string;
  public imageUrl!: string;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
  }
);

// Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;
