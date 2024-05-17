import express from 'express';
import UserController from '../controller/userController';
import { isLogin } from '../middleware/authentication';

const router = express.Router();

router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/:id', isLogin, UserController.getUserById);

export default router;