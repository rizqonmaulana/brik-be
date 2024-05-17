import express from 'express';

import OrderController from '../controller/orderController';
import { isLogin, isAdmin } from '../middleware/authentication';

const router = express.Router();

router.get('/', isLogin, isAdmin, OrderController.getAllOrders);
router.get('/user', isLogin, OrderController.getOrderByUserid);
router.get('/:id', isLogin, OrderController.getOrderByid);
router.post('/', isLogin, OrderController.createOrder);

export default router;