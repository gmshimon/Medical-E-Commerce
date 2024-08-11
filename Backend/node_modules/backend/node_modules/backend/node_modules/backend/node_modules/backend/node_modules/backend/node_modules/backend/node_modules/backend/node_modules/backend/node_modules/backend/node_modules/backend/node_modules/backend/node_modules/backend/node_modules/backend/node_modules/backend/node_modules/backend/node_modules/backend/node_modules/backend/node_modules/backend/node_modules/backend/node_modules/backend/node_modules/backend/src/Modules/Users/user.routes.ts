import express from 'express';
import authController  from './user.controller'
const router = express.Router();

router.post('/create-user',authController.registerUser)
export default router