import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import prisma from '../prisma.js';
import { config } from '../config.js';
import { sendPasswordResetOtp } from '../utils/email.js';

const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6)
});

export const register = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { Email: data.email }
    });

    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        Password: hashedPassword,
        Role: 'USER',
        ActiveSession: false
      },
      select: {
        UserID: true,
        Email: true,
        FirstName: true,
        LastName: true,
        Role: true
      }
    });

    const token = jwt.sign({ id: user.UserID }, config.jwtSecret);

    res.status(201).json({ status: 'success', user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Invalid input data', details: error.errors });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(req.body);

    const user = await prisma.user.findUnique({
      where: { Email: email }
    });

    if (!user || !(await bcrypt.compare(password, user.Password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.UserID }, config.jwtSecret);

    res.json({
      status: 'success',
      user: {
        UserID: user.UserID,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Role: user.Role
      },
      token
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Invalid input data', details: error.errors });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
};

// Forgot Password - Request OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = z.object({
      email: z.string().email()
    }).parse(req.body);

    const user = await prisma.user.findUnique({
      where: { Email: email }
    });

    if (!user) {
      // Return 200 even if user not found for security
      return res.json({ status: 'success', message: 'If an account exists, an OTP will be sent.' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpires: otpExpires,
        otpVerified: false
      }
    });

    await sendPasswordResetOtp(email, otp);

    res.json({ status: 'success', message: 'If an account exists, an OTP will be sent.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Invalid email format' });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { otp } = z.object({
      otp: z.string()
    }).parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Invalid or expired OTP' });
    }

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        otpVerified: true
      }
    });

    res.json({ status: 'success', message: 'OTP verified successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Invalid input data', details: error.errors });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = z.object({
      newPassword: z.string().min(6)
    }).parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        otpVerified: true
      }
    });

    if (!user) {
      return res.status(400).json({ status: 'error', message: 'OTP not verified' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        Password: hashedPassword,
        resetPasswordOtp: null,
        resetPasswordOtpExpires: null,
        otpVerified: false
      }
    });

    res.json({ status: 'success', message: 'Password has been reset successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', message: 'Invalid input data', details: error.errors });
    } else {
      res.status(500).json({ status: 'error', message: 'Server error' });
    }
  }
};

/**
 * Fetch all users with Role === "USER"
 * Endpoint: GET /api/users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { Role: "USER" },
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
        Email: true,
        Role: true,
      },
    });

    res.json({
      status: "success",
      users: users || [], // Ensure it always returns an array
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

