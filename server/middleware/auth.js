import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import prisma from '../prisma.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).send({ message: "Token not present" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { UserID: decoded.id },
      select: { UserID: true, Role: true }
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.Role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};