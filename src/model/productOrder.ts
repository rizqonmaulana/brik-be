import { DataTypes, Model } from 'sequelize';
import sequelize from './config';
import Category from './category'; // Import the Category model
import Product from './product';

interface ProductOrderAttributes {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  productId: number;
  categoryId: number;
}

class ProductOrder extends Model<ProductOrderAttributes> implements ProductOrderAttributes {
  public id?: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public imageUrl!: string;
  public productId!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductOrder.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
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
    modelName: 'ProductOrder',
    tableName: 'productOrders',
    timestamps: true,
    paranoid: true,
  }
);

// Define the association between Product and Category
// ProductOrder.belongsTo(Product, { foreignKey: 'productId' });
// ProductOrder.belongsTo(Category, { foreignKey: 'categoryId' });

export default ProductOrder;
