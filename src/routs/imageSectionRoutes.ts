import express from 'express';
const router = express.Router();
import * as imageSectionController from '../controllers/imageSectionController';
import { authMiddleware } from '../middleware/middleware';

/*
    POST api/v1/imageSection/saveImageSection
    save an imageSection
 */
router.post('/save', authMiddleware, imageSectionController.saveImageSection);

export default router;
