import { Request, Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import * as articleServices from '../services/articleServices';

const saveArticle = async (req: Request, res: Response, next: NextFunction) => {
  const article = req.body;
  let articleResponse;
  try {
    articleResponse = await articleServices.saveArticleService(article);
    if (articleResponse.success === 'true') {
      res
        .status(201)
        .json(
          responseDTO(articleResponse.success, {}, articleResponse.message),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let articleResponse;
  try {
    articleResponse = await articleServices.getAllArticlesService();
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

const getArticleWithPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const offset = parseInt(req.params.offset);
  const limit = parseInt(req.params.limit);
  let articleResponse;
  try {
    articleResponse = await articleServices.getArticleWithPaginationService(
      offset,
      limit,
    );
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};
const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  let articleResponse;
  try {
    articleResponse = await articleServices.getArticleByIdService(id);
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};
const getArticleByLetter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let articleResponse;
  const letter = req.params.letter;
  try {
    articleResponse = await articleServices.getArticleByLetterService(letter);
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const article = req.body;
  let articleResponse;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json(responseDTO('false', [], 'Invalid article id'));
    }
    articleResponse = await articleServices.updateArticleService(id, article);
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};
const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  let articleResponse;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json(responseDTO('false', [], 'Invalid article id'));
  }
  try {
    articleResponse = await articleServices.deleteArticleService(id);
    if (articleResponse.success === 'true') {
      res
        .status(200)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            articleResponse.success,
            articleResponse.data,
            articleResponse.message,
          ),
        );
    }
  } catch (err) {
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

export {
  saveArticle,
  getAllArticles,
  getArticleWithPagination,
  getArticleById,
  getArticleByLetter,
  updateArticle,
  deleteArticle,
};
