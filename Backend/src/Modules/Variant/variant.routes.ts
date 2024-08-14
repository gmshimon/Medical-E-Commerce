import express from 'express';
import variantController from './variant.controller';
import verifyAdminToken from '../../middleware/Token/verifyAdmin';

const router = express.Router();

router.put('/update-variant/:id',verifyAdminToken,variantController.updateVariant);
router.delete('/delete-variant/:id',verifyAdminToken,variantController.deleteVariant);
router.post('/create-variant',verifyAdminToken,variantController.createVariant)
router.get('/',variantController.getAllVariants)

export default router;