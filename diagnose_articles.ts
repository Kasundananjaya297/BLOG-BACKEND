
import mongoose from 'mongoose';
import Article from './src/models/articleModels';
import User from './src/models/userModels';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.DB_URL || 'mongodb://localhost:27017/blog';

async function diagnose() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const count = await Article.countDocuments();
        console.log(`Total articles: ${count}`);

        const articles = await Article.find().limit(5);
        console.log('Sample articles:');
        articles.forEach(a => {
            console.log(`- Title: ${a.title}, AuthorId: ${a.authorId}, Type: ${typeof a.authorId}`);
        });

        const users = await User.find().limit(5);
        console.log('Sample users:');
        users.forEach(u => {
            console.log(`- Name: ${u.fname}, _id: ${u._id}, Type: ${typeof u._id}, mysqlId: ${u.mysqlId}`);
        });

        const user65 = await User.findOne({ $or: [{ _id: '65' }, { mysqlId: 65 }] });
        if (user65) {
            console.log(`User for AuthorId 65: Name: ${user65.fname}, _id: ${user65._id}, mysqlId: ${user65.mysqlId}`);
        } else {
            console.log('No user found for AuthorId 65 or mysqlId 65');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

diagnose();
