import { Request, Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import * as articleServices from '../services/articleServices';
import { AuthRequest } from '../middleware/middleware';
import Article from '../models/articleModels';

const saveArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const article = req.body;
  const user = req.user;

  let articleResponse;
  try {
    articleResponse = await articleServices.saveArticleService(article, user);
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
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const user = req.user;

  if (!user || (!user._id && !user.mysqlId)) {
    res.status(401).json(responseDTO('false', [], 'Unauthorized'));
    return;
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json(responseDTO('false', [], 'Invalid article id'));
    return;
  }

  try {
    const article = await Article.findById(id);
    if (!article) {
      res.status(404).json(responseDTO('false', [], 'Article not found'));
      return;
    }

    const userIdMongo = user._id ? user._id.toString() : '';
    const userIdMysql = user.mysqlId ? user.mysqlId.toString() : '';
    const isOwner = article.authorId === userIdMongo || article.authorId === userIdMysql;
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
      res.status(403).json(responseDTO('false', [], 'Unauthorized to delete this article'));
      return;
    }

    const articleResponse = await articleServices.deleteArticleService(id);
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

const getArticlesByAuthor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  if (!user || !user._id) {
    res.status(401).json(responseDTO('false', [], 'Unauthorized'));
  } else {
    let articleResponse;
    try {
      const authorIds = [user._id.toString()];
      if (user.mysqlId) {
        authorIds.push(user.mysqlId.toString());
      }

      articleResponse = await articleServices.getArticlesByAuthorService(
        authorIds,
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
  }
};

const getArticlesByAuthorId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorId = req.params.authorId;

  if (!authorId) {
    res.status(400).json(responseDTO('false', [], 'Missing author ID'));
    return;
  }

  try {
    const articleResponse = await articleServices.getArticlesByAuthorIdService(authorId);
    if (articleResponse.success === 'true') {
      res.status(200).json(
        responseDTO(
          articleResponse.success,
          articleResponse.data,
          articleResponse.message,
        ),
      );
    } else {
      res.status(400).json(
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

const toggleLike = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const user = req.user;

  if (!user || (!user._id && !user.mysqlId)) {
    res.status(401).json(responseDTO('false', [], 'Unauthorized'));
    return;
  }

  const userId = user._id ? user._id.toString() : user.mysqlId.toString();

  try {
    const articleResponse = await articleServices.toggleLikeService(id, userId);
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

export {
  saveArticle,
  getAllArticles,
  getArticleWithPagination,
  getArticleById,
  getArticleByLetter,
  updateArticle,
  deleteArticle,
  getArticlesByAuthor,
  toggleLike,
  getArticlesByAuthorId,
};
