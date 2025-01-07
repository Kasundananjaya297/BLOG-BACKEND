import express from 'express';
import * as articleController from '../controllers/articleController';

const router = express.Router();
/* 
    POST api/v1/articles/saveArticle 
    Save an article
 */
router.post('/saveArticle', articleController.saveArticle);
/* 
    GET api/v1/articles/getAllArticles 
    Get all articles
 */
router.get('/getAllArticles', articleController.getAllArticles);
/*
GET api/v1/articles/getArticleWithPagination/:offset/:limit
Get all articles with pagination
 */
router.get(
  '/getArticleWithPagination/:offset/:limit',
  articleController.getArticleWithPagination,
);

export default router;
