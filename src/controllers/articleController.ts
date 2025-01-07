import { Request, Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import * as articleServices from '../services/articleServices';

const saveArticle = async (req: Request, res: Response, next: NextFunction) => {
  const article = req.body;
  let articleResponse;
  try {
    articleResponse = await articleServices.saveArticleService(article);
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

export { saveArticle };
