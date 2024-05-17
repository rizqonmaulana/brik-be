import { Request, Response } from 'express';
import { Op } from 'sequelize';

import OrderService from '../service/orderService';
import ProductService from '../service/productService';
import CartService from '../service/cartService';

import { successResponse, errorResponse } from '../helper/response';
import sequelize from '../config/database'

const OrderController = {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();

      res.json(successResponse('Orders retrieved successfully', orders))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving orders', error.message));
    }
  },

  async getOrderByid(req: Request, res: Response) {
    try {
      const orderId= parseInt(req.params.id);

      const order = await OrderService.getOrderById(orderId);

      res.json(successResponse('Order retrieved successfully', order))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving the order', error.message));
    }
  },

  async getOrderByUserid(req: Request, res: Response) {
    try {
      const userId = (req as any).token.userId

      const order = await OrderService.getAllOrders({where: {userId: parseInt(userId)}});

      res.json(successResponse('Order retrieved successfully', order))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving the order', error.message));
    }
  },

  async createOrder(req: Request, res: Response) {
    const transaction = await sequelize.transaction()

    try {
      const { products } = req.body;
      const userId = parseInt(req.body.userId)

      const order = await OrderService.createOrder({userId: userId}, { transaction });

      const productIds = products.map((product:any) => product.productId);

      const getProducts = await ProductService.getAllProducts({
        id: {
          [Op.in]: productIds
        }
      }, {transaction})

      const isStockSufficient = await ProductService.checkProductStock(products, getProducts);

      if (isStockSufficient.isSufficient === false) {
          await transaction.rollback();
          return res.status(400).json(errorResponse(isStockSufficient.errors.join(', ')));
      }

      const createProductOrder = await ProductService.createProductOrder(products, getProducts)

      const productOrderIds = createProductOrder.map((product:any) => {
        const quantity = products.find((item:any) => item.productId === product.productId);

        return {
          id:  product.id,
          quantity: quantity?.quantity
        }
      });


      await OrderService.createOrderItem({orderId: order?.id, productOrderIds}, {transaction}) 
 
      await ProductService.updateStock(products, getProducts, {transaction})

      const countTotalPrice = await ProductService.countTotalPrice(products, getProducts)

      await OrderService.updateOrder({orderId: order?.id, totalPrice: countTotalPrice}, {transaction})

      await CartService.deleteCartByUserId(userId, {transaction})

      await transaction.commit();

      res.json(successResponse('Order created successfully', order));
    } catch (error: any) {
      await transaction.rollback();
      res.status(500).json(errorResponse('An error occurred while creating the order', error.message));
    }
  },
};

export default OrderController;
