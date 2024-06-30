import { Sequelize } from "sequelize";
import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialectModule: pg,
  dialect: "postgres",
});

export default sequelize;
