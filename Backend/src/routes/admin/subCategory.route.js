import { Router } from "express";
import {
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../../controllers/admin/subCategory.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("image"), addSubCategory);
router.patch("/:id", upload.single("image"), updateSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
