import express from 'express';
import authController  from './user.controller'
import uploader from '../../middleware/fileUpload/uploader';
import verifyLoginToken from '../../middleware/Token/verifyToken';

const router = express.Router();

router.post('/create-user',uploader.single('image'),authController.registerUser)
router.post('/login',authController.loginUser)
router.post('/login2',verifyLoginToken)
export default router