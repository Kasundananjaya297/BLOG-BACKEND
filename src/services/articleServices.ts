import { IArticle } from '../interfaces/articleInterfaces';
import { saveArticleRepo, getAllArticlesRepo } from '../repos/articleRepo';

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

export { saveArticleService, getAllArticlesService };
