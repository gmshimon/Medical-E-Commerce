import express from 'express';
import authController  from './user.controller'
import uploader from '../../middleware/fileUpload/uploader';

const router = express.Router();

router.post('/create-user',uploader.single('image'),authController.registerUser)
export default router