import express from "express";
import categoryController from "./category.controller";
import uploader from "../../middleware/fileUpload/categoryImageUpload";
import verifyAdminToken from "../../middleware/Token/verifyAdmin";
const router = express.Router();

router.delete('/delete-category/:id',categoryController.deleteCategory)
router.post('/',uploader.single('image'),categoryController.createCategory)
router.put('/update-category-image',uploader.single('image'),categoryController.updateCategoryImage )
router.put('/update-category',categoryController.updateCategory)
router.get('/',categoryController.getAllCategory)

export default router