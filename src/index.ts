import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './config/database';
import defineAssociations from './model/associations'

//routes
import userRouter from './router/userRouter'
import productRouter from './router/productRouter'
import categoryRouter from './router/categoryRouter'
import orderRouter from './router/orderRouter'
import uploadFileRouter from './router/uploadFileRouter'
import cartRouter from './router/cartRouter'

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);
app.use('/upload-file', uploadFileRouter);
app.use('/carts', cartRouter);


// Sequelize initialization and server start
const startServer = async () => {
    try {
        // Define associations
        defineAssociations();
        
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: false,  alter: false });
        console.log('All models were synchronized successfully.');

        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
