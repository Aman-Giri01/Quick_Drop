import { Router } from "express";
import {
  addProduct,
  deleteImage,
  deleteProduct,
  getProduct,
  getProducts,
  updateImage,
  updateProduct,
} from "../../controllers/admin/product.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("images"), addProduct);
router.patch("/updImg", upload.single("images"), updateImage);
router.patch("/delImg", deleteImage);

router.get("/all", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;