import { DataTypes, Model } from 'sequelize';
import sequelize from './config';
import Order from './order'; // Import the Order model
import ProductOrder from './productOrder'; // Import the Product model

interface OrderItemAttributes {
  id?: number;
  orderId?: number;
  productOrderId?: number;
  quantity?: number;
}

class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
  public id?: number;
  public orderId!: number;
  public productOrderId!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Order,
        key: 'id',
      },
    },
    productOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ProductOrder,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderItems',
    timestamps: true,
    paranoid: true,
  }
);


export default OrderItem;
