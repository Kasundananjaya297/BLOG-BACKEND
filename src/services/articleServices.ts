import { IArticle } from '../interfaces/articleInterfaces';
import { saveArticle } from '../repos/articleRepo';

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
    await saveArticle(article);
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

export { saveArticleService };
