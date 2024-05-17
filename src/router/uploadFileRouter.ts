import express from 'express'
import UploadFileController from '../controller/uploadFileController'
import uploadFile from '../middleware/uploadFile';

import { isLogin, isAdmin } from '../middleware/authentication';

const router = express.Router()

router.post('/', isLogin, isAdmin, uploadFile ,UploadFileController.uploadFile);

export default router;