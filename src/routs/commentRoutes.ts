import express from 'express';
import * as commentController from '../controllers/commentController';
import { authMiddleware } from '../middleware/middleware';

const router = express.Router();

// Public routes
router.get('/article/:articleId', commentController.getCommentsByArticle);

// Protected routes
router.post('/saveComment', authMiddleware, commentController.postComment);
router.put('/updateComment/:id', authMiddleware, commentController.updateComment);
router.delete('/deleteComment/:id', authMiddleware, commentController.deleteComment);

export default router;
