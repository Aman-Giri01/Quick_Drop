import { Router } from "express";
import {
  addCategory,
  updateCategory,
} from "../../controllers/admin/category.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("image"), addCategory);
router.patch("/:id", upload.single("image"), updateCategory);

export default router;
