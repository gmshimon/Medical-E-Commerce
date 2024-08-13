import express from 'express';
import variantController from './variant.controller';

const router = express.Router();

router.put('/:id',variantController.updateVariant);
router.delete('/:id',variantController.deleteVariant);
router.post('/create-variant',variantController.createVariant)
router.get('/',variantController.getAllVariants)

export default router;