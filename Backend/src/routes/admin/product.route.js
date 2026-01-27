import { Router } from "express";
import { addProduct, deleteProduct, updateProduct } from "../../controllers/admin/product.controller.js";

const router = Router();

router.post('/add', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;