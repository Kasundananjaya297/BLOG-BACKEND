import express from 'express';
import * as articleController from '../controllers/articleController';

const router = express.Router();

router.post('/saveArticle', articleController.saveArticle);

export default router;
