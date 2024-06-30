import { DataTypes, Model } from 'sequelize';
import sequelize from './config';

interface CategoryAttributes {
  id?: number; // Make id optional
  name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id?: number; // Make id optional
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    paranoid: true,
  }
);

export default Category;
