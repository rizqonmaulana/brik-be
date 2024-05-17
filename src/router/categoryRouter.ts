import express from 'express';

import CategoryController from '../controller/categoryController';
import { isLogin, isAdmin } from '../middleware/authentication';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', isLogin, isAdmin, CategoryController.createCategory);
router.patch('/:id',isLogin, isAdmin, CategoryController.updateCategory);
router.delete('/:id',isLogin, isAdmin, CategoryController.deleteCategory);

export default router;