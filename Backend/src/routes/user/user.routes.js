// user routes
import * as user from "../../controllers/user/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", user.registerUser);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.patch("/update-profile", user.updateProfile);

export default router;
