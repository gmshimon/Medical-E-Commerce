import express from 'express';
import authController  from './user.controller'
import uploader from '../../middleware/fileUpload/uploader';

const router = express.Router();

router.post('/create-user',uploader.single('image'),authController.registerUser)
router.post('/login',authController.loginUser)
export default router