import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface OrderAttributes {
  id?: number;
  userId: number;
  totalPrice?: number;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id?: number;
  public userId!: number;
  public totalPrice!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    paranoid: true,
  }
);

export default Order;
