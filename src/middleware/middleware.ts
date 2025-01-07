import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifytoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { valid, decoded, error } = verifyToken(token);

  if (!valid) {
    res.status(403).json({ message: 'Invalid token', error });
    return;
  } else {
    if (typeof decoded !== 'string' && decoded?.email) {
      console.log('Action Detected from ', decoded.email);
    }
  }

  next();
};
