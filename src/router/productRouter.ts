import express from 'express';

import ProductController from '../controller/productController';
import { isLogin, isAdmin } from '../middleware/authentication';

const router = express.Router();

router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);
router.post('/', isLogin, isAdmin, ProductController.createProduct);
router.patch('/:id', isLogin, isAdmin, ProductController.updateProduct);
router.delete('/:id', isLogin, isAdmin, ProductController.deleteProduct);

export default router;