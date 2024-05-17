import express from 'express';

import CartController from '../controller/cartController';
import { isLogin } from '../middleware/authentication';

const router = express.Router();

router.get('/', isLogin, CartController.getCartByUserId);
router.post('/', isLogin, CartController.createOrUpdateCart);
router.delete('/:id', isLogin, CartController.deleteCart);

export default router;