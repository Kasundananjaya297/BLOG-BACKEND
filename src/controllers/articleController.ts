import { Request, Response, NextFunction } from 'express';

const saveArticle = async (req: Request, res: Response, next: NextFunction) => {
  console.log('article controller called');
  res.send('called article controller');
};

export { saveArticle };
