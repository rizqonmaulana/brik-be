import { Sequelize } from "sequelize";
import * as pg from "pg";
import dotenv from "dotenv";

import Cart from './cart';
import Category from './category';
import Order from './order';
import OrderItem from './orderItem'
import Product from './product';
import ProductOrder from './productOrder';
import User from './user';

dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
    dialectModule: pg,
    dialect: "postgres",
  });

export {
  sequelize,
  Cart,
  Category,
  Order,
  OrderItem,
  Product,
  ProductOrder,
  User
};

// export default models;
