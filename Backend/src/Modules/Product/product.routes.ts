import express from 'express';
import uploader from '../../middleware/fileUpload/productImageUpload';
import productController from './product.controller';

const router = express.Router();

router.post('/create-product',uploader.array('images',5),productController.createPost)

export default router 