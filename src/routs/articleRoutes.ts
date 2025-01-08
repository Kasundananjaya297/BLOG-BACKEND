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
router.get('/getAllArticles', articleController.getAllArticles);

/*
  GET api/v1/articles/getArticleWithPagination/:offset/:limit
  Get all articles with pagination
 */
router.get(
  '/getArticleWithPagination/:offset/:limit',
  articleController.getArticleWithPagination,
);
/* 
    GET api/v1/articles/getArticleById/:id 
    Get an article by id
*/
router.get('/getArticleById/:id', articleController.getArticleById);
/*
  PUT api/v1/articles/updateArticle/:id
  Update an article by id
 */
router.put(
  '/updateArticle/:id',
  authMiddleware,
  articleController.updateArticle,
);
/*
  GET api/v1/articles/getArticleByLetter/:letter
  Get an article by letter
*/
router.get('/getArticleByLetter/:letter', articleController.getArticleByLetter);

router.delete(
  '/deleteArticle/:id',
  authMiddleware,
  articleController.deleteArticle,
);

export default router;
