import express from 'express';
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getAllUsers
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.get('/get-users', getAllUsers);

export default router;