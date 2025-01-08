import express from 'express';
import * as articleController from '../controllers/articleController';
import { authMiddleware } from '../middleware/middleware';

const router = express.Router();

/* 
    POST api/v1/articles/saveArticle 
    Save an article
 */
router.post('/saveArticle', authMiddleware, articleController.saveArticle);

/* 
    GET api/v1/articles/getAllArticles 
    Get all articles
 */
router.get('/getAllArticles', authMiddleware, articleController.getAllArticles);

/*
  GET api/v1/articles/getArticleWithPagination/:offset/:limit
  Get all articles with pagination
 */
router.get(
  '/getArticleWithPagination/:offset/:limit',
  authMiddleware,
  articleController.getArticleWithPagination,
);
/* 
    GET api/v1/articles/getArticleById/:id 
    Get an article by id
*/
router.get(
  '/getArticleById/:id',
  authMiddleware,
  articleController.getArticleById,
);

export default router;
