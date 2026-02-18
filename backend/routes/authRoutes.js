import express from "express";
import { loginEmailOtp,registerEmail,registerPhone,verifyOtp,setPassword, verifyEmailOtp, loginPhoneOtp, verifyPhoneOtp, loginEmailPassword,loginPhonePassword, checkUser } from "../controllers/authController.js";
import { otpLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register-email", registerEmail);
router.post("/register-phone", registerPhone);

router.post("/check-user",checkUser)
router.post("/verify-register-otp", verifyOtp);
router.post("/set-password", setPassword);
router.post("/login-email-otp", loginEmailOtp);
router.post("/verify-email-otp",verifyEmailOtp);
router.post("/login-phone-otp",otpLimiter,loginPhoneOtp)
router.post("/verify-phone-otp",otpLimiter, verifyPhoneOtp);
router.post("/login-email-password",loginEmailPassword)
router.post("/login-phone-password",loginPhonePassword)


export default router;
