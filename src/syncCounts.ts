import mongoose from 'mongoose';
import Article from './models/articleModels';
import Comment from './models/commentModels';

const syncCounts = async () => {
    try {
        await mongoose.connect('mongodb+srv://sndnudayakantha_db_user:EldCUVcJhJYjmjln@cluster0.hbzorcb.mongodb.net/?appName=Cluster0');
        console.log('Connected to DB');

        const articles = await Article.find();
        for (const article of articles) {
            const count = await Comment.countDocuments({ articleId: article._id, status: 'active', parentId: null });
            article.commentsCount = count;
            await article.save();
            console.log(`Updated count for ${article.title}: ${count}`);
        }

        console.log('Sync complete');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing:', error);
        process.exit(1);
    }
};

syncCounts();
