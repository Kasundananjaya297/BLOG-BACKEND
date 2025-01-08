import { IArticle } from '../interfaces/articleInterfaces';
import Article from '../models/articleModels';

const saveArticleRepo = async (articleDetails: IArticle) => {
  try {
    const article = new Article(articleDetails);
    await article.save();
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add article to the database');
  }
};
const getAllArticlesRepo = async () => {
  try {
    const articles = await Article.find();
    return articles;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch articles from the database');
  }
};
const getArticleWithPaginationRepo = async (offset: number, limit: number) => {
  try {
    const articles = await Article.find()
      .skip(offset * limit)
      .limit(limit);
    return articles;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch articles from the database');
  }
};
const getArticleByIdRepo = async (id: string) => {
  //check if id is valid _id or oid in mongodb
  try {
    const article = await Article.find({ _id: id });
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch article from the database');
  }
};
export {
  saveArticleRepo,
  getAllArticlesRepo,
  getArticleWithPaginationRepo,
  getArticleByIdRepo,
};
