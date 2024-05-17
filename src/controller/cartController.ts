import { Request, Response } from 'express';

import CartService from '../service/cartService';
import { successResponse, errorResponse } from '../helper/response';

const CartController = {
  async getCartByUserId(req: Request, res: Response) {
    try {
      const userId = (req as any).token.userId

      const cart = await CartService.getCart({where: {userId: userId}});

      if(!cart) return res.status(404).json(errorResponse('Cart not found'))

      res.json(successResponse('Cart retrieved successfully', cart))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving the cart', error.message));
    }
  },

  async createOrUpdateCart(req: Request, res: Response) {
    try {
      const { productId } = req.body
      const userId = (req as any).token.userId
 
      const newCart = await CartService.createOrUpdateCart({userId, productId});

      res.json(successResponse('Cart created successfully', newCart))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while creating the cart', error.message));
    }
  },

  async deleteCart(req: Request, res: Response) {
    try {
        const cartId = parseInt(req.params.id);

        const deletedCart = await CartService.deleteCart(cartId);

        if (!deletedCart) return res.status(404).json(errorResponse('Cart not found'));

        res.json(successResponse('Cart deleted successfully'));
    } catch (error: any) {
        res.status(500).json(errorResponse('An error occurred while deleting the cart', error.message));
    }
  }
};

export default CartController;
