import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "../../controllers/user/address.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { addAddressSchema } from "../../validators/address.validator.js";

const router = Router();

router.post("/add", authenticate, validate(addAddressSchema), addAddress);
router.patch("/:id", authenticate, updateAddress);
router.delete("/:id", authenticate, deleteAddress);

export default router;
