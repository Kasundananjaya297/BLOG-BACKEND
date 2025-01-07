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
  const articles = await Article.find();
  return articles;
};
const getArticleWithPaginationRepo = async (offset: number, limit: number) => {
  const articles = await Article.find()
    .skip(offset * limit)
    .limit(limit);
  return articles;
};
export { saveArticleRepo, getAllArticlesRepo, getArticleWithPaginationRepo };
