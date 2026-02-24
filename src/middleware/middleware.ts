import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifytoken';
import MongoUser from '../models/userModels';
import { syncUserByEmail, syncUserById } from '../services/userSyncService';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
    if (typeof decoded !== 'string') {
      const { email, id } = decoded as any;

      console.log('Action Detected from ', email || `User ID: ${id}`);

      try {
        let user;

        if (email) {
          // Find user by email in MongoDB
          user = await MongoUser.findOne({ email });

          // If user is absent from MongoDB but logged in using a valid JWT (from import-export), fetch them from MySQL!
          if (!user) {
            console.log(`User ${email} not found in MongoDB. Triggering lazy sync from MySQL...`);
            user = await syncUserByEmail(email);
          }
        } else if (id) {
          // Find user by mysqlId in MongoDB
          user = await MongoUser.findOne({ mysqlId: id });

          if (!user) {
            console.log(`User ID ${id} not found in MongoDB. Triggering lazy sync from MySQL...`);
            user = await syncUserById(id);
          }
        }

        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        // Attach user to request object
        req.user = user;
      } catch (err) {
        console.error('Error during lazy sync in authMiddleware:', err);
        res.status(500).json({ message: 'Internal Server Error during user sync' });
        return;
      }
    }
  }

  next();
};
