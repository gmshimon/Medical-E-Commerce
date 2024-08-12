import express from "express";
import categoryController from "./category.controller";
import uploader from "../../middleware/fileUpload/categoryImageUpload";
import verifyAdminToken from "../../middleware/Token/verifyAdmin";
const router = express.Router();

router.post('/',verifyAdminToken,uploader.single('image'),categoryController.createCategory)

export default router