import { get } from 'mongoose';
import { IArticle } from '../interfaces/articleInterfaces';
import {
  saveArticleRepo,
  getAllArticlesRepo,
  getArticleWithPaginationRepo,
  getArticleByIdRepo,
  getArticleByLetterRepo,
  updateArticleRepo,
  deleteArticleRepo,
} from '../repos/articleRepo';
import {
  deleteArticle,
  getArticleByLetter,
  updateArticle,
} from '../controllers/articleController';

const saveArticleService = async (article: IArticle) => {
  if (
    !article.title ||
    !article.category ||
    !article.images ||
    !article.subtitle
  ) {
    console.log('Required Field missed');
    return { success: 'false', data: [], message: 'Required Field missed' };
  }
  try {
    await saveArticleRepo(article);
    console.log('Article added successfully');
    return {
      success: 'true',
      data: article,
      message: 'Article added successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to add article to the database',
    };
  }
};

const getAllArticlesService = async () => {
  try {
    const articles = await getAllArticlesRepo();
    console.log('Articles fetched successfully');
    return {
      success: 'true',
      data: articles,
      message: 'Articles fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch articles from the database',
    };
  }
};
const getArticleWithPaginationService = async (
  offset: number,
  limit: number,
) => {
  try {
    const articles = await getArticleWithPaginationRepo(offset, limit);

    console.log('Articles fetched successfully');
    return {
      success: 'true',
      data: articles,
      message: 'Articles fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch articles from the database',
    };
  }
};
const getArticleByIdService = async (id: string) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return { message: 'Invalid article id', success: 'false', data: [] };
    }
    const article = await getArticleByIdRepo(id);
    console.log('Article fetched successfully');
    if (!article) {
      return {
        success: 'false',
        data: [],
        message: 'Article not found',
      };
    }
    return {
      success: 'true',
      data: article,
      message: 'Article fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch article from the database',
    };
  }
};
const getArticleByLetterService = async (letter: string) => {
  try {
    const articles = await getArticleByLetterRepo(letter);
    console.log('Articles fetched successfully');
    return {
      success: 'true',
      data: articles,
      message: 'Articles fetched successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to fetch articles from the database',
    };
  }
};
const updateArticleService = async (id: string, article: IArticle) => {
  try {
    const articles = await updateArticleRepo(id, article);
    console.log('Article updated successfully');
    return {
      success: 'true',
      data: articles,
      message: 'Article updated successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to update article in the database',
    };
  }
};
const deleteArticleService = async (id: string) => {
  try {
    const articles = await deleteArticleRepo(id);
    console.log('Article deleted successfully');
    return {
      success: 'true',
      data: articles,
      message: 'Article deleted successfully',
    };
  } catch (err) {
    console.log(err);
    return {
      success: 'false',
      data: [],
      message: 'Failed to delete article from the database',
    };
  }
};

export {
  saveArticleService,
  getAllArticlesService,
  getArticleWithPaginationService,
  getArticleByIdService,
  getArticleByLetterService,
  updateArticleService,
  deleteArticleService,
};
