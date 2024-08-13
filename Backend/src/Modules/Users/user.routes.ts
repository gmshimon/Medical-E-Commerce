import express from 'express';
import authController  from './user.controller'
import uploader from '../../middleware/fileUpload/uploader';
import verifyLoginToken from '../../middleware/Token/verifyToken';
import verifyAdminToken from '../../middleware/Token/verifyAdmin';

const router = express.Router();

router.post('/create-user',uploader.single('image'),authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/get-users',verifyAdminToken,authController.getAllUsers)
export default router