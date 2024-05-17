import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Order from './order'

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}

interface UserAttributes {
  id?: number;
  name: string;
  username: string;
  password: string;
  role: UserRole;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public role!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.CUSTOMER,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true, // Enable paranoid mode for soft delete
    timestamps: true,
  }
);

// //relationship
// User.hasMany(Order, { 
//   sourceKey: 'id',
//   foreignKey: 'userId'
// });

export default User;
