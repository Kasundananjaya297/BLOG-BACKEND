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
export { saveArticleRepo,  getAllArticlesRepo };
