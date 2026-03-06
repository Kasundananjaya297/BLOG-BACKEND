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
  try {
    const article = await Article.findById(id);
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch article from the database');
  }
};
const getArticleByLetterRepo = async (letter: string) => {
  try {
    const articles = await Article.find({
      $or: [
        { title: { $regex: `${letter}`, $options: 'i' } },
        { content: { $regex: `${letter}`, $options: 'i' } },
        { category: { $regex: `${letter}`, $options: 'i' } },
        { subtitle: { $regex: `${letter}`, $options: 'i' } },
      ],
    });
    return articles;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch article from the database');
  }
};
const updateArticleRepo = async (id: string, articleDetails: IArticle) => {
  try {
    const article = await Article.findByIdAndUpdate(id, articleDetails, {
      new: true,
    });
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update article in the database');
  }
};
const deleteArticleRepo = async (id: string) => {
  try {
    const article = await Article.deleteOne({ _id: id });
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete article in the database');
  }
};

const getArticlesByAuthorRepo = async (authorIds: string[]) => {
  try {
    const articles = await Article.find({ authorId: { $in: authorIds } });
    return articles;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user articles from the database');
  }
};

const toggleLikeRepo = async (id: string, userId: string) => {
  try {
    const article = await Article.findById(id);
    if (!article) return null;

    const likeIndex = article.likes.indexOf(userId);
    if (likeIndex > -1) {
      // Unlike: User ID already in likes array, remove it
      article.likes.splice(likeIndex, 1);
    } else {
      // Like: User ID not in likes array, add it
      article.likes.push(userId);
    }

    await article.save();
    return article;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to toggle like in the database');
  }
};

const getArticlesByAuthorIdRepo = async (authorId: string) => {
  try {
    const articles = await Article.find({ authorId }).sort({ createdAt: -1 });
    return articles;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch articles by author ID from the database');
  }
};

export {
  saveArticleRepo,
  getAllArticlesRepo,
  getArticleWithPaginationRepo,
  getArticleByIdRepo,
  getArticleByLetterRepo,
  updateArticleRepo,
  deleteArticleRepo,
  getArticlesByAuthorRepo,
  toggleLikeRepo,
  getArticlesByAuthorIdRepo,
};
