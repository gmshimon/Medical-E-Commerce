import express from 'express';
import uploader from '../../middleware/fileUpload/productImageUpload';
import productController from './product.controller';
import verifyAdminToken from '../../middleware/Token/verifyAdmin';

const router = express.Router();

router.delete('/delete-product/:id',verifyAdminToken,productController.deleteProduct)
router.put('/update-product/:id',verifyAdminToken,productController.updateProduct)
router.get('/',productController.getAllProducts)
router.post('/create-product',uploader.array('images',5),productController.createPost)

export default router 