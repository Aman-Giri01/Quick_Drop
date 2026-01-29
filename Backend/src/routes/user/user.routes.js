// user routes
import * as user from "../../controllers/user/user.controller.js";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", user.registerUser);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.patch("/update-profile", authenticate,user.updateProfile);
router.patch("/update-password",authenticate,user.changePassword);
router.get("/verify-email/:emailToken",user.verifyEmail);
router.post("/resend-verification",user.resendEmailVerificationLink);
router.post("/forgot-password",user.forgotPassword);
router.get("/reset-password/:passwordToken",user.resetPassword);
router.get("/current",authenticate,user.currentUser);

export default router;
